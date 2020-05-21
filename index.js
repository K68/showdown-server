const args = process.argv.slice(2),
  crypto = require('crypto'),
  restify = require('restify'),
  got = require('got'),
  showdown = require('showdown'),
  redis = require("redis"),
  converter = new showdown.Converter(),
  rds = redis.createClient(args[0] || 6379, args[1] || '127.0.0.1');

/**
 * Section Init
 */
// restify
const server = restify.createServer();
server.use(restify.plugins.bodyParser({}));
// showdown
converter.setFlavor('github');
// redis
rds.on("error", (error) => {
    console.error(error);
});
// staticpage
const staticPageKey = args[2] || 'ALL';

// client.set("key", "value", redis.print);
// client.get("key", redis.print);

// API 1: markdown to html
server.post('/mdToHtml', (req, res, next) => {
    if (req.body.md !== undefined) {
        const cacheKey = 'md:html:' + crypto.createHash('md5').update(req.body.md).digest('hex');
        rds.get(cacheKey, (err, cacheVal) => {
            if (!cacheVal) {
                const htmlRaw = converter.makeHtml(req.body.md);
                rds.set(cacheKey, htmlRaw, () => {
                    rds.expire(cacheKey, 600);
                });
                res.send(htmlRaw);
            } else {
                res.send(cacheVal);
                rds.expire(cacheKey, 600);
            }
            next();
        });
    } else {
        res.send('');
        next();
    }
});

const cache_tmp_prefix = 'cache:tmp:';
// API 2: set 60 seconds temp cache
server.post('/cache', (req, res, next) => {
    if (req.body.raw !== undefined && req.body.raw !== '') {
        const cacheKey = crypto.createHash('md5').update(req.body.raw).digest('hex');
        const rdKey = cache_tmp_prefix + cacheKey;
        rds.set(rdKey, req.body.raw, () => {
            rds.expire(rdKey, 60);
        });
        res.send(cacheKey);
    } else {
        res.send('');
    }
    next();
});

// API 3: get temp cache
server.get('/cache/:key', (req, res, next) => {
    const rdKey = cache_tmp_prefix + req.params.key;
    rds.get(rdKey, (err, cacheVal) => {
        if (cacheVal) {
            res.send(cacheVal);
        } else {
            res.send('');
        }
        next();
    });
});

const patternTitle = /<title>(.*?)<\/title>/i;
const patternDesc = /<meta[^<]*?name="description".*?content="(.*?)"[^<]*?>/i;
const patternKeys = /<meta[^<]*?name="keywords".*?content="(.*?)"[^<]*?>/i;
const patternNoJs = /<noscript>(.*?)<\/noscript>/i;
const tplMetaTimestamp = '<meta name="static:time" content="{}">';
// API 4: set page html cache
server.post('/staticpage*', (req, res, next) => {
    const siteName = req.header('sp-site-name', '');
    if (siteName && req.header('sp-key', 'ALL') === staticPageKey) {
        const pageUrl = req.body.pageUrl;
        const title = req.body.title;               // <= 70 chars
        const description = req.body.description;   // <= 150 chars
        const keywords = req.body.keywords;
        let htmlRaw = req.body.htmlRaw;             // document.documentElement.outerHTML

        const headPos = htmlRaw.indexOf('<head>') + 6;
        htmlRaw = htmlRaw.slice(0, headPos) +
          tplMetaTimestamp.replace('{}', '' + new Date().getTime()) +
          htmlRaw.slice(headPos);
        if (description) {
            if (htmlRaw.search(patternDesc) > 0) {
                htmlRaw = htmlRaw.replace(patternDesc, '<meta name="description" content="' + description + '">');
            } else {
                htmlRaw = htmlRaw.slice(0, headPos) + '<meta name="description" content="' + description + '">' + htmlRaw.slice(headPos);
            }
            if (htmlRaw.search(patternNoJs) > 0) {
                htmlRaw = htmlRaw.replace(patternNoJs, '<noscript>' + description + '</noscript>');
            }
        }
        if (keywords) {
            if (htmlRaw.search(patternKeys) > 0) {
                htmlRaw = htmlRaw.replace(patternKeys, '<meta name="keywords" content="' + keywords + '">');
            } else {
                htmlRaw = htmlRaw.slice(0, headPos) + '<meta name="keywords" content="' + keywords + '">' + htmlRaw.slice(headPos);
            }
        }
        if (title) {
            if (htmlRaw.search(patternTitle) > 0) {
                htmlRaw = htmlRaw.replace(patternTitle, '<title>' + title + '</title>');
            } else {
                htmlRaw = htmlRaw.slice(0, headPos) + '<title>' + title + '</title>' + htmlRaw.slice(headPos);
            }
        }
        const rdKey = 'SP:' + siteName + ':' + pageUrl;
        rds.set(rdKey, htmlRaw, () => {
            res.send('success');
            next();
        });
    } else {
        res.send('invalid');
        next();
    }
});

/* Headers SP
    sp-site-name
    sp-dynamic
    sp-key
 */
// API 5: get page html cache
server.get('/staticpage/*', (req, res, next) => {
    const host = req.header('host');
    const siteName = req.header('sp-site-name', '');
    const toDynamic = req.header('sp-dynamic', host + '/index.html');
    const rdKey = 'SP:' + siteName + ':' + req.url.split('/staticpage/')[1];
    console.log(rdKey);
    rds.get(rdKey, (err, cacheVal) => {
        res.header('content-type', 'text/html; charset=utf-8');
        if (cacheVal) {
            res.end(cacheVal);
            next();
        } else {
            got(toDynamic).then(response => {
                res.end(response.body);
                next();
            }).catch(error => {
                if (error.response) {
                    res.end(error.response.body);
                } else {
                    res.end('invalid');
                }
                next();
            });
        }
    });
});

// API 6: delete page html cache
server.del('/staticpage/*', (req, res, next) => {
    const siteName = req.header('sp-site-name', '');
    if (siteName && req.header('sp-key', 'ALL') === staticPageKey) {
        const rdKey = 'SP:' + siteName + ':' + req.url.split('/staticpage/')[1];
        console.log('del: ' + rdKey);
        rds.del(rdKey);
        res.send('');
    } else {
        res.send('invalid');
    }
    next();
});

// API 7: get all page html cache keys
server.get('/staticpage/keys', (req, res, next) => {
    const siteName = req.header('sp-site-name', '');
    if (siteName && req.header('sp-key', 'ALL') === staticPageKey) {
        const rdKeyPrefix = 'SP:' + siteName + ':*';
        rds.keys(rdKeyPrefix, (err, keys) => {
            if (err) {
                res.send('invalid');
                next();
            } else {
                res.send(keys.map(i => i.substring(rdKeyPrefix.length - 1)));
                next();
            }
        });
    } else {
        res.send('invalid');
        next();
    }
});

// TODO 站点基础js更新接口？

server.listen(3068, () => {
    console.log('%s listening at %s:', server.name, server.url);
});
