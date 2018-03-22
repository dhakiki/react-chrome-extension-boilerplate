const bluebird = require('bluebird');

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/contextMenus');
require('./background/inject');
//require('./background/badge');

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log('ooooh');
    switch (msg.type) {
        case 'popupInit':
            console.log('a');
            //response(tabStorage[msg.tabId]);
            break;
        case 'itemSelected':
            chrome.storage.sync.get(['itemTracker'], function(itemTracker) {
              console.log('hai', itemTracker);
              if (!itemTracker[msg.pageId]) itemTracker[msg.pageId] = [];
              itemTracker[msg.pageId].push(msg.item);
              chrome.storage.sync.set({itemTracker}, function() {
                console.log('stored');
                response('success');
              });
            });
            //console.log(JSON.stringify(window.localStorage.getItem("itemTracker")), 'hia');
            //var itemMap = JSON.parse(window.localStorage.getItem("itemTracker") || '{}');
            //window.localStorage.setItem("itemTracker", JSON.stringify(itemMap));
        default:
            response('unknown request');
            break;
    }
});
