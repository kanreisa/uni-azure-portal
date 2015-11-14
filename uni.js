/*jslint vars:true, plusplus:true, white:true */
/*global $ */
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
    removePortalContentPointerDownEvents();

    var hash = '';
    var bladesChanged = false;
    var bladesContainer = null;
    var content = null;

    function loop() {

        setTimeout(loop, 200);

        if (hash !== location.hash || bladesChanged === true) {
            hash = location.hash;
            bladesChanged = false;

            // Get all blades
            var blades = document.querySelectorAll('.fxs-journey-layout > section');

            var i, l = blades.length;

            for (i = 0; i < l; i++) {
                $(blades[i]).removeClass('uni-fixed-bladesize-side uni-fixed-bladesize-main');
            }

            if (l >= 2) {
                if (
                    (
                        $(blades[l - 2]).hasClass('fxs-bladesize-small') === true &&
                        $(blades[l - 1]).hasClass('fxs-bladesize-small') === true
                    ) ||
                    (
                        $(blades[l - 2]).hasClass('fxs-bladesize-small') === true &&
                        $(blades[l - 1]).hasClass('fxs-bladesize-small') === false
                    )
                ) {
                    $(blades[l - 2]).addClass('uni-fixed-bladesize-side');
                    $(blades[l - 1]).addClass('uni-fixed-bladesize-main');
                } else if (
                    $(blades[l - 2]).hasClass('fxs-bladesize-small') === false &&
                    $(blades[l - 1]).hasClass('fxs-bladesize-small') === true
                ) {
                    $(blades[l - 2]).addClass('uni-fixed-bladesize-main');
                    $(blades[l - 1]).addClass('uni-fixed-bladesize-side');
                }
            }
        }

        if (bladesContainer === null) {
            bladesContainer = document.querySelector('.fxs-journey-layout');

            if (bladesContainer) {
                bladesContainer.addEventListener('DOMSubtreeModified', function () {

                    bladesChanged = true;
                });
            }
        }

        if (content === null) {
            content = document.querySelector('#web-container > div.fxs-portal-main > div.fxs-portal-content');
        } else {
            if (content.scrollLeft !== content.scrollWidth - content.offsetWidth - 1) {
                content.scrollLeft = content.scrollWidth - content.offsetWidth - 1;
            }
        }
    }
    loop();

}());
