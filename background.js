'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {urlContains: '.'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.cmd === "setOnOffState") {
            isExtensionOn = request.data.value;
        }

        if (request.cmd === "getOnOffState") {
            sendResponse(isExtensionOn);
        }
});

