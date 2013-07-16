var ScreenOutputHandler = function(options) {

    var mediator = false;

    /**
     * Options in the module
     * @type {Object}
     * @see  init function
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
     * DOM element used to show the position of the touch
     * @type {DOMElement}
     */
    var pointer = false;

    /**
     * DOM element used to show the position of the touch
     * @type {DOMElement}
     */
    var touchInfo = false;

    /**
     * Last reference to the request animation frame call
     * @type {Number}
     */
    var lastAnimationReference = false;

    /**
     * Constructor
     * @param  {Object} options:
     *         - mediator Mediator to communicate with the rest of the app
     *         - touchSurface surface where the touch is happening
     */
    var init = function(options) {

        mediator = options.mediator;
        opt = options;
        viewportHeight = opt.touchSurface.height();
        viewportWidth = opt.touchSurface.width();

        var pointerHTML = ich["pointer"](options);
        pointer = $(pointerHTML).appendTo(opt.touchSurface);

        var touchInfoHTML = ich["touch-unit-info"](options);
        touchInfo = $(touchInfoHTML).appendTo(opt.touchSurface);
    };

    /**
     * Called to change the position of the unit.
     * @param  {Number} x X coordinate of the position
     * @param  {Number} y Y coordinate of the position
     */
    var changeUnitPosition = function(x, y) {

        if(lastAnimationReference) {
            window.cancelAnimationFrame(lastAnimationReference);
        }
        lastAnimationReference = window.requestAnimationFrame(function() {
            movePointerTo(x, y);
            updateTouchInfo(x, y);
        });
    };

    /**
     * Moves the pointer to a position
     * @param  {Number} x X coordinate of the position
     * @param  {Number} y Y coordinate of the position
     */
    var movePointerTo = function(x,y) {

        x = viewportWidth*x;
        y = viewportHeight*y;

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

        var prettyX = Math.round(x*100);
        var prettyY = 100 - Math.round(y*100);
        touchInfo.html("" + prettyX + "," + prettyY);

        x = viewportWidth*x;
        y = viewportHeight*y;

        var newTransformValue = "translate(" + x + "px, " + y + "px)";

        touchInfo.css({
            "transform": newTransformValue,
            "-webkit-transform": "translate(" + x + "px, " + y + "px)",
            "-moz-transform": "translate(" + x + "px, " + y + "px)"
        });
    };

    init(options);

    /**
     * Called from outside to notify this module of the start of touch
     * @param  {Object} eventInfo Info related to the event
     */
    var notifyStart = function(eventInfo) {

        pointer.addClass("active");
        touchInfo.addClass("active");
        movePointerTo(eventInfo.relativeX, eventInfo.relativeY);
        updateTouchInfo(eventInfo.relativeX, eventInfo.relativeY);
    };

    /**
     * Called from outside to notify this module of the end of touch
     * @param  {Object} eventInfo Info related to the event
     */
    var notifyStop = function(eventInfo) {

        pointer.removeClass("active");
        touchInfo.removeClass("active");
    };

    /**
     * Called from outside to notify this module of the movement of touch
     * @param  {Object} eventInfo Info related to the event
     */
    var notifyMovement = function(eventInfo) {

        changeUnitPosition(eventInfo.relativeX, eventInfo.relativeY);
    };

    return {
        notifyStart:    notifyStart,
        notifyStop:     notifyStop,
        notifyMovement: notifyMovement
    };
};