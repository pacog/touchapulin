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
         * We will store the synth here, audiolet for now
         * @type {Object}
         */
        var synth = false;

        var sineGenerator = false;

        /**
         * Constructor of the app
         */
        var init = function() {

            initEvents();
            initSound();
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
         * Initializes the sound player
         */
        var initSound = function() {

            synth = new Audiolet();
            sineGenerator = new Sine(synth);
        };

        /**
         * Called when the touch starts
         * @param  {Event} event Event generated
         */
        var touchStarted = function(event) {

            touchSurface.addClass("touching");

            var position = getPosition(event);
            var x = position.x;
            var y = position.y;
            movePointerTo(x, y);
            updateTouchInfo(x, y);
            event.gesture.srcEvent.preventDefault();
            startPlaying();
        };

        /**
         * Called when the touch ends
         * @param  {Event} event Event generated
         */
        var touchEnded = function(event) {

            touchSurface.removeClass("touching");
            event.gesture.srcEvent.preventDefault();
            stopPlaying();
        };

        /**
         * Called when dragging through the page
         * @param  {Event} event
         */
        var dragging = function(event) {

            var position = getPosition(event);
            var x = position.x;
            var y = position.y;
            movePointerTo(x, y);
            updateTouchInfo(x, y);
            event.gesture.srcEvent.preventDefault();
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
         * Gets the position of an event
         * @param  {Event} event
         * @return {Object} {x,y} object with the position
         */
        var getPosition = function(event) {

            if(Modernizr.touch) {

                //TODO: support for more touches
                return {
                    "x": event.gesture.srcEvent.touches[0].clientX,
                    "y": event.gesture.srcEvent.touches[0].clientY
                };
            } else {

                return {
                    "x": event.gesture.srcEvent.clientX,
                    "y": event.gesture.srcEvent.clientY
                };
            }
        };

        /**
         * Starts playing the synth
         */
        var startPlaying = function() {

            sineGenerator.connect(synth.output);
        };

        /**
         * Stios playing the synth
         */
        var stopPlaying = function() {

            sineGenerator.disconnect(synth.output);
        };


        return {
            init: init
        };
    };

    var app = new Touchapulin();
    app.init();
});

