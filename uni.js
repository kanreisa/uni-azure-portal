/*jslint vars:true, plusplus:true */
/*global chrome */
(function () {
    'use strict';

    function blockEvent(e) {

        e.stopPropagation();

        return false;
    }

    function removePortalContentPointerDownEvents() {

        var div = document.querySelector('.fxs-portal-content');

        if (div) {
            div.addEventListener('MSPointerDown', blockEvent);
            div.addEventListener('pointerdown', blockEvent);
            div.addEventListener('mousedown', blockEvent);
        } else {
            setTimeout(removePortalContentPointerDownEvents, 1000);
        }
    }

    var hash = '';
    function hashProcessor() {

        setTimeout(hashProcessor, 500);

        if (hash !== location.hash) {
            hash = location.hash;

            if (/Microsoft\.Web\/sites\/[0-9a-z\-]+/.test(hash) === true) {
                var siteName = hash.match(/Microsoft\.Web\/sites\/([0-9a-z\-]+)/)[1];

                var summaryBottom = document.querySelector('div.fxs-part-resourcesummary-bottom');
                var summarySettingsButton = document.querySelector('span.fxs-part-resourcesummary-settings');

                if (summaryBottom === null || summarySettingsButton === null) {
                    hash = '';
                    return;
                }

                var kudu = summarySettingsButton.cloneNode(true);
                kudu.className = 'fxs-text-primary fxcontrol-hotspot fxcontrol-hotspot-clickable';

                kudu.firstChild.textContent = 'Kudu';

                kudu.addEventListener('click', function () {

                    window.open('https://' + siteName + '.scm.azurewebsites.net/', siteName);
                });

                summaryBottom.insertBefore(kudu, summaryBottom.firstChild);
            }
        }
    }

    window.addEventListener('DOMContentLoaded', function () {

        var local = chrome.extension.getURL('/');

        var body = document.getElementsByTagName('body')[0];

        var css = document.createElement('link');

        css.setAttribute('type', 'text/css');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('href', local + 'uni.css');

        body.appendChild(css);

        removePortalContentPointerDownEvents();
        hashProcessor();
    });

}());
