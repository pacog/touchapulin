$(function() {

    var Touchapulin = function() {

        /**
         * Dom element where the touch events happen.
         * @type {Element}
         */
        var touchSurface = $(".js-touch-surface");

        /**
         * Constructor of the app
         */
        var init = function() {

            initEvents();
        };

        /**
         * Initializes the events
         */
        var initEvents = function() {

            touchSurface.hammer().on("touch", touchStarted);
            touchSurface.hammer().on("release", touchEnded);
        };

        /**
         * Called when the touch starts
         * @param  {Event} event Event generated
         */
        var touchStarted = function(event) {

            console.log("touch starts");
        };

        /**
         * Called when the touch ends
         * @param  {Event} event Event generated
         */
        var touchEnded = function(event) {

            console.log("touch ends");
        };

        return {
            init: init
        };
    };

    var app = new Touchapulin();
    app.init();
});

