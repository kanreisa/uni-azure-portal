/*jslint vars:true, plusplus:true */
/*global chrome */
(function () {
    'use strict';

    window.addEventListener('DOMContentLoaded', function () {

        chrome.runtime.sendMessage({ key: 'isDisabled' }, function (response) {

            if (response === false) {
                var local = chrome.extension.getURL('/');

                var css = document.createElement('link');
                css.setAttribute('type', 'text/css');
                css.setAttribute('rel', 'stylesheet');
                css.setAttribute('href', local + 'uni.css');

                var js = document.createElement('script');
                js.setAttribute('src', local + 'uni.js');

                var body = document.getElementsByTagName('body')[0];
                body.appendChild(css);
                body.appendChild(js);
            }
        });
    });

}());
