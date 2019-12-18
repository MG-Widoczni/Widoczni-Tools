
var isExtensionOn = false;

function disableESR() {
    var checkbox = document.getElementById("enhanced-search-results");
    if (checkbox.checked = false) {
        isExtensionOn = false;
    } else if (checkbox.checked = true) {
        isExtensionOn = true;
    } else {
        alert("Error");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById("enhanced-search-results");

//Send message to event.js (background script) telling it to disable the extension.

    chrome.extension.sendMessage({cmd: "setOnOffState", data: {value: isExtensionOn}});

    chrome.extension.sendMessage({cmd: "getOnOffState"}, function (response) {
        if (response !== undefined) {
            if (response) {
                checkbox.checked = true;
            }
            else {
 			    checkbox.checked = false;
            }
        }
    });
});