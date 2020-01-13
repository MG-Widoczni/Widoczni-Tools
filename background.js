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

// Receive message and store in chrome.storage
chrome.extension.onConnect.addListener(function(port) {
	if (port.name === "ESR Port") {
     port.onMessage.addListener(function(msg) {
		 var valueReceived = msg;
		 chrome.storage.sync.set({'esrValue': valueReceived}, function () {
		 });
     });
 } else if (port.name === "GCS Port") {
     port.onMessage.addListener(function(msg) {
		 var valueReceived = msg;
		 chrome.storage.sync.set({'gcsValue': valueReceived}, function () {
		 });
     });
 } else if (port.name === "OKO Tools Port") {
     port.onMessage.addListener(function(msg) {
		 var valueReceived = msg;
		 chrome.storage.sync.set({'okoToolsValue': valueReceived}, function () {
		 });
     });
 } else if (port.name === "SEO Tools Port") {
     port.onMessage.addListener(function(msg) {
		 var valueReceived = msg;
		 chrome.storage.sync.set({'seoToolsValue': valueReceived}, function () {
		 });
     });
 } else if (port.name === "SERP Count Port") {
     port.onMessage.addListener(function(msg) {
		 var valueReceived = msg;
		 chrome.storage.sync.set({'serpCountValue': valueReceived}, function () {
		 });
     });
 }
});

