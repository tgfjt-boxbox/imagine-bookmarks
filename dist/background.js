console.log('Hi!')

const bookmarks = [];

function parseBookmarkNode(node){
  if (node.children) {
    node.children.forEach(parseBookmarkNode);
  } else if(node.url && /^http/.test(node.url)) {

    fetch(node.url, {})
      .then(r => r.text())
      .then(text => {
        const div = document.createElement('div');
        div.innerHTML = text.trim();
        const ogImage = div.querySelector('[property="og:image"]')

        if (ogImage) {
          bookmarks.push({
            ...node,
            image: ogImage.content
          });
        } else {
          bookmarks.push(node);
        }
      })
  }
}

chrome.bookmarks.getTree((roots) => {
  roots.forEach(parseBookmarkNode);
});

chrome.runtime.onConnect.addListener(port => {
  port.postMessage({
    message: "Hello",
    bookmarks
  })
});
