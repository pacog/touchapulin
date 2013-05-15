$(function() {

    var Touchapulin = function() {

        /**
         * Dom element where the touch events happen.
         * @type {Element}
         */
        var touchSurface = $(".js-touch-surface");

        var pointer = $(".js-pointer");

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

            touchSurface.addClass("touching");
            var x = getXPosition(event);
            var y = getYPosition(event);
            movePointerTo(x, y);
        };

        /**
         * Called when the touch ends
         * @param  {Event} event Event generated
         */
        var touchEnded = function(event) {

            touchSurface.removeClass("touching");
        };

        /**
         * Moves the pointer to a position
         * @param  {Number} x X coordinate of the position
         * @param  {Number} y Y coordinate of the position
         */
        var movePointerTo = function(x,y) {

            pointer.css({
                "transform": "translate(" + x + "px, " + y + "px)"
            });
        };

        /**
         * Gets the X position of an event
         * @param  {Event} event
         * @return {Number} the X position of the event
         */
        var getXPosition = function(event) {

            return event.gesture.srcEvent.clientX;
        };

        /**
         * Gets the Y position of an event
         * @param  {Event} event
         * @return {Number} the Y position of the event
         */
        var getYPosition = function(event) {

            return event.gesture.srcEvent.clientY;
        };

        return {
            init: init
        };
    };

    var app = new Touchapulin();
    app.init();
});

