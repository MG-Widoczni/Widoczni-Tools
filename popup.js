
// Create connection to pass messages
var esr_port = chrome.extension.connect({
      name: "ESR Port"
 });
 
// Create connection to pass messages
var gcs_port = chrome.extension.connect({
      name: "GCS Port"
 });

// Create connection to pass messages
var oko_tools_port = chrome.extension.connect({
      name: "OKO Tools Port"
 });

// Create connection to pass messages 
var seo_tools_port = chrome.extension.connect({
      name: "SEO Tools Port"
 });

// Create connection to pass messages
var serp_count_port = chrome.extension.connect({
      name: "SERP Count Port"
 });
 

// Define variables for each script
var esrValue;
var gcsValue;
var okoToolsValue;
var seoToolsValue;
var serpCountValue;

// Set value and send message
function esr_save_options() {
	if(this.checked) {
		esrValue = true;
		esr_port.postMessage(esrValue);
		
    } else {
		esrValue = false;
		esr_port.postMessage(esrValue);
	};
}

// Set value and send message
function gcs_save_options() {
	if(this.checked) {
		gcsValue = true;
		gcs_port.postMessage(gcsValue);
		
    } else {
		gcsValue = false;
		gcs_port.postMessage(gcsValue);
	};
}

// Set value and send message
function oko_tools_save_options() {
	if(this.checked) {
		okoToolsValue = true;
		oko_tools_port.postMessage(okoToolsValue);
		
    } else {
		okoToolsValue = false;
		oko_tools_port.postMessage(okoToolsValue);
	};
}

// Set value and send message
function seo_tools_save_options() {
	if(this.checked) {
		seoToolsValue = true;
		seo_tools_port.postMessage(seoToolsValue);
		
    } else {
		seoToolsValue = false;
		seo_tools_port.postMessage(seoToolsValue);
	};
}

// Set value and send message
function serp_count_save_options() {
	if(this.checked) {
		serpCountValue = true;
		serp_count_port.postMessage(serpCountValue);
		
    } else {
		serpCountValue = false;
		serp_count_port.postMessage(serpCountValue);
	};
}

// Restore selected options on window popup
function restore_options() {
	chrome.storage.sync.get('esrValue', function(value) {
	    document.getElementById('enhanced-search-results').checked = value.esrValue;
	  });
  	chrome.storage.sync.get('gcsValue', function(value) {
  	    document.getElementById('gakpt-copy-script').checked = value.gcsValue;
  	  });
    chrome.storage.sync.get('okoToolsValue', function(value) {
    	document.getElementById('oko-tools-box').checked = value.okoToolsValue;
      });
    chrome.storage.sync.get('seoToolsValue', function(value) {
 	    document.getElementById('seo-tools-box').checked = value.seoToolsValue;
	  });
    chrome.storage.sync.get('serpCountValue', function(value) {
 	    document.getElementById('seo-count-script').checked = value.serpCountValue;
	  });
}

// Add listeners
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#enhanced-search-results').addEventListener( 'change', esr_save_options);
document.querySelector('#gakpt-copy-script').addEventListener( 'change', gcs_save_options);
document.querySelector('#oko-tools-box').addEventListener( 'change', oko_tools_save_options);
document.querySelector('#seo-tools-box').addEventListener( 'change', seo_tools_save_options);
document.querySelector('#seo-count-script').addEventListener( 'change', serp_count_save_options);

  
