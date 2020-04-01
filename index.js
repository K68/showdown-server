const crypto = require('crypto');

const restify = require('restify'),
    showdown = require('showdown'),
    converter = new showdown.Converter();

const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 300, checkperiod: 600 } );

converter.setFlavor('github');

const server = restify.createServer();
server.use(restify.plugins.bodyParser({}));

// API 1: markdown to html
server.post('/mdToHtml', (req, res, next) => {
    if (req.body.md !== undefined) {
        const cacheKey = crypto.createHash('md5').update(req.body.md).digest('hex');
        const cacheVal = myCache.get(cacheKey);
        if (cacheVal === undefined) {
            const htmlRaw = converter.makeHtml(req.body.md);
            myCache.set(cacheKey, htmlRaw);
            res.send(htmlRaw);
        } else {
            res.send(cacheVal);
        }
    } else {
        res.send('');
    }
    next();
});

// API 2: set 60 seconds temp cache
server.post('/cache', (req, res, next) => {
    if (req.body.raw !== undefined && req.body.raw !== '') {
        const cacheKey = crypto.createHash('md5').update(req.body.raw).digest('hex');
        myCache.set(cacheKey, req.body.raw, 60);
        res.send(cacheKey)
    } else {
        res.send('');
    }
    next();
});

// API 3: get temp cache
server.get('/cache/:key', (req, res, next) => {
    const cacheKey = req.params.key;
    const cacheVal = myCache.get(cacheKey);
    if (cacheVal === undefined) {
        res.send('');
    } else {
        res.send(cacheVal);
    }
});

server.listen(3068, function() {
    console.log('%s listening at %s:', server.name, server.url);
});
