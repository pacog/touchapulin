var ScreenOutputHandler = function(options) {

    var mediator = false;

    /**
     * Options in the module
     * @type {Object}
     * @see  init function
     */
    var opt = false;

    /**
     * Constructor
     * @param  {Object} options:
     *         - mediator Mediator to communicate with the rest of the app
     *         - touchSurface surface where the touch is happening
     *         - pointer element to indicate the position of the touch
     *         - xCoord element with the X coordinate
     *         - yCoord element with the y coordinate
     */
    var init = function(options) {

        mediator = options.mediator;
        opt = options;
        initEvents();
    };


    /**
     * Initializes all events we listen from the mediator
     */
    var initEvents = function() {

        mediator.subscribe("inputStarted", inputStartHandler);
        mediator.subscribe("inputEnded", inputEndHandler);
        mediator.subscribe("inputMoved", inputMoveHandler);
    };

    /**
     * Handler for the start of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputStartHandler = function(x, y) {

        opt.touchSurface.addClass("touching");
        movePointerTo(x, y);
        updateTouchInfo(x, y);
    };

    /**
     * Handler for the end of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputEndHandler = function() {

        opt.touchSurface.removeClass("touching");
    };

    /**
     * Handler for the move of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputMoveHandler = function(x, y) {

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

        opt.pointer.css({
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

        opt.xCoord.html(x + "px");
        opt.yCoord.html(y + "px");
    };

    init(options);

    return {};
};