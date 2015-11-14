/*jslint vars:true, plusplus:true */
/*global chrome */
(function () {
    'use strict';

    function isDisabled() {
        return localStorage.getItem('uni-azure-portal-disabled') === '1';
    }

    function disable() {
        localStorage.setItem('uni-azure-portal-disabled', '1');
    }

    function enable() {
        localStorage.setItem('uni-azure-portal-disabled', '0');
    }

    var portalRegexp = /^https:\/\/(?:(ms\.)?)portal\.azure\.com\/\??/;

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

        if (portalRegexp.test(tab.url) === false) {
            return;
        }

        chrome.pageAction.show(tabId);

        if (isDisabled() === true) {
            chrome.pageAction.setIcon({
                tabId: tabId,
                path: {
                    '19' : 'icon-disabled19.png',
                    '38' : 'icon-disabled38.png'
                }
            });
            chrome.pageAction.setTitle({
                tabId: tabId,
                title: 'Click to Enable: Uni Azure Portal'
            });
        } else {
            chrome.pageAction.setTitle({
                tabId: tabId,
                title: 'Click to Disable: Uni Azure Portal'
            });
        }
    });

    chrome.runtime.onMessage.addListener(function (request, sender, response) {

        if (request.key === 'isDisabled') {
            response(isDisabled());
        }
    });

    chrome.pageAction.onClicked.addListener(function (tab) {

        if (isDisabled() === true) {
            enable();
        } else {
            disable();
        }

        chrome.tabs.reload(tab.id);
    });

}());
