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

        opt.touchSurface.hammer().on("touch", touchStarted);
        opt.touchSurface.hammer().on("release", touchEnded);
        opt.touchSurface.hammer().on("drag", dragging);
    };

    /**
     * Called when the touch starts
     * @param  {Event} event Event generated
     */
    var touchStarted = function(event) {

        opt.touchSurface.addClass("touching");

        var position = getPosition(event);
        var x = position.x;
        var y = position.y;
        mediator.publish("inputStarted", x, y);
        event.gesture.srcEvent.preventDefault();

    };

    /**
     * Called when the touch ends
     * @param  {Event} event Event generated
     */
    var touchEnded = function(event) {

        mediator.publish("inputEnded");
        event.gesture.srcEvent.preventDefault();
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
            x = event.gesture.srcEvent.touches[0].clientX;
            y = event.gesture.srcEvent.touches[0].clientY;
        } else {

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
     * Called when dragging through the page
     * @param  {Event} event
     */
    var dragging = function(event) {

        var position = getPosition(event);
        var x = position.x;
        var y = position.y;
        mediator.publish("inputMoved", x, y);
        event.gesture.srcEvent.preventDefault();
    };

    init(options);
};