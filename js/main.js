$(function() {

    var Touchapulin = function() {

        /**
         * Dom element where the touch events happen.
         * @type {Element}
         */
        var touchSurface = $(".js-touch-surface");

        /**
         * Dom element that shows the touch position
         * @type {Element}
         */
        var pointer = $(".js-pointer");

        /**
         * Dom element that shows the X coordinate of the touch
         * @type {Element}
         */
        var xCoord = $(".js-x-coord");

        /**
         * Dom element that shows the Y coordinate of the touch
         * @type {Element}
         */
        var yCoord = $(".js-y-coord");

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
            touchSurface.hammer().on("drag", dragging);
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
            updateTouchInfo(x, y);
        };

        /**
         * Called when the touch ends
         * @param  {Event} event Event generated
         */
        var touchEnded = function(event) {

            touchSurface.removeClass("touching");
        };

        /**
         * Called when dragging through the page
         * @param  {Event} event
         */
        var dragging = function(event) {

            var x = getXPosition(event);
            var y = getYPosition(event);
            movePointerTo(x, y);
            updateTouchInfo(x, y);
        };

        /**
         * Moves the pointer to a position
         * @param  {Number} x X coordinate of the position
         * @param  {Number} y Y coordinate of the position
         */
        var movePointerTo = function(x,y) {

            var newTransformValue = "translate(" + x + "px, " + y + "px)";

            pointer.css({
                "transform": newTransformValue,
                "-webkit-transform": "translate(" + x + "px, " + y + "px)",
                "-moz-transform": "translate(" + x + "px, " + y + "px)"
            });
        };

        /**
         * Updates the coordinates info
         * @param  {Number} x X coordinate of the position
         * @param  {Number} y Y coordinate of the position
         */
        var updateTouchInfo = function(x, y) {

            xCoord.html(x + "px");
            yCoord.html(y + "px");
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

