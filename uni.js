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

    window.addEventListener('DOMContentLoaded', function () {

        var local = chrome.extension.getURL('/');

        var body = document.getElementsByTagName('body')[0];

        var css = document.createElement('link');

        css.setAttribute('type', 'text/css');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('href', local + 'uni.css');

        body.appendChild(css);

        removePortalContentPointerDownEvents();
    });

}());
