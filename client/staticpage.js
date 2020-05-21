(function () {
  var uploaded = false;
  function isCache() {
    var metaList = document.getElementsByTagName("meta");
    for (var i = 0; i < metaList.length; i++) {
      if (metaList[i].getAttribute('name') === 'static:time') {
        return metaList[i].content;
      }
    }
    return false;
  }
  /*
  const pageUrl = req.body.pageUrl;
  const title = req.body.title;               // <= 70 chars
  const description = req.body.description;   // <= 150 chars
   */
  function upload(pageUrl, title, description, keywords, expire) {
    if (!uploaded && staticpage.uploadUrl) {
      uploaded = true;
      var ct = isCache();
      if (!ct || (expire && parseInt(ct) + expire * 1000 < new Date().getTime())) {
        var htmlRaw = document.documentElement.outerHTML;
        var sendData = {
          pageUrl,
          title,
          description,
          keywords,
          htmlRaw,
        };
        var xhr = new XMLHttpRequest();
        xhr.open('POST', staticpage.uploadUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(sendData));
      }
    }
  }
  window.staticpage = {
    isCache,
    upload,
    uploadUrl: ''
  };
})();

