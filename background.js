/*jslint vars:true, plusplus:true */
/*global chrome */
(function () {
    'use strict';

    var portalRegexp = /^https:\/\/(?:(ms\.)?)portal\.azure\.com\/\??/;

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

        if (portalRegexp.test(tab.url) === false) {
            return;
        }

        chrome.pageAction.show(tabId);
    });

}());
