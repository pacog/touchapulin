var InputHandler = function(options) {

    /**
     * Allows communications between modules.
     * @type {Object}
     */
    var mediator = false;

    /**
     * Options received
     * @type {Object}
     */
    var opt = false;

    /**
     * Height of the viewport
     * @type {Number}
     */
    var viewportHeight = false;

    /**
     * Width of the viewport
     * @type {Number}
     */
    var viewportWidth = false;

    /**
     * Constructor
     * @param  {Object} options:
     *         - mediator: interface to communicate with the rest of the app
     *         - touchSurface: surface where we should detect the input
     */
    var init = function(options) {

        mediator = options.mediator;
        opt = options;
        initEvents();
        viewportHeight = opt.touchSurface.height();
        viewportWidth = opt.touchSurface.width();
    };

    /**
     * Initializes the events
     */
    var initEvents = function() {

        opt.touchSurface.on("touchstart", touchStarted);
        opt.touchSurface.on("touchmove", touchMove);
        opt.touchSurface.on("touchend", touchEnded);
    };

    /**
     * Called when the touch starts
     * @param  {Event} event Event generated
     */
    var touchStarted = function(event) {

        //TODO: this should be handled in other module
        opt.touchSurface.addClass("touching");

        publishEventForChangedTouches(event, "inputStarted");
        event.preventDefault();

    };

    /**
     * Called when the touch ends
     * @param  {Event} event Event generated
     */
    var touchEnded = function(event) {

        publishEventForChangedTouches(event, "inputEnded");
        event.preventDefault();
    };

    /**
     * Gets the position of an event
     * @param  {Event} event
     * @return {Object} {x,y} object with the position
     */
    var getPosition = function(event) {

        var x, y;

        if(Modernizr.touch) {

            //TODO: support for more touches
            x = event.clientX;
            y = event.clientY;
        } else {

            //TODO: do this for clicks also
            x = event.gesture.srcEvent.clientX;
            y = event.gesture.srcEvent.clientY;
        }

        x = x/viewportWidth;
        y = y/viewportHeight;

        if(x<0) x = 0;
        if(x>1) x = 1;
        if(y<0) y = 0;
        if(y>1) y = 1;

        return {
            "x": x,
            "y": y
        };
    };

    /**
     * Publishes an event for each changed touch in a Event
     * @param  {Event} event      Event which contains the changed touches
     * @param  {String} eventName Name of the event we want to publish
     */
    var publishEventForChangedTouches = function(event, eventName) {

        for(var i=0; i<event.originalEvent.changedTouches.length; i++) {

            var touch = event.originalEvent.changedTouches[i];

            //Notify new touch
            var position = getPosition(touch);
            touch.relativeX = position.x;
            touch.relativeY = position.y;
            mediator.publish(eventName, touch);
        }
    };

    /**
     * Called when dragging through the page
     * @param  {Event} event
     */
    var touchMove = function(event) {

        publishEventForChangedTouches(event, "inputMoved");
        event.preventDefault();
    };

    init(options);
};