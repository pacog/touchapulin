var ScreenOutputHandler = function(options) {

    /**
     * Maximum scale we will apply to the pointer (when going up in the screen)
     * @type {Number}
     */
    var MAX_SCALE_POINTER = 1.5;

    /**
     * Minimun scale we will apply to the pointer (when going down in the screen)
     * @type {Number}
     */
    var MIN_SCALE_POINTER = 0.5;

    /**
     * Mediator
     * @type {Object}
     */
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
     * DOM element used to contain the pointer
     * @type {DOMElement}
     */
    var pointerContainer = false;

    /**
     * DOM element used to show the position of the touch
     * @type {DOMElement}
     */
    var pointer = false;

    /**
     * DOM element used to show the vertical position of the touch
     * @type {DOMElement}
     */
    var pointerVerticalHelper = false;

    /**
     * DOM element used to show the horizontal position of the touch
     * @type {DOMElement}
     */
    var pointerHorizontalHelper = false;

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
        pointerContainer = $(pointerHTML).appendTo(opt.touchSurface);

        pointer = pointerContainer.find(".js-pointer");
        pointer.addClass("asdvasdvasdvsad222");
        pointerHorizontalHelper = pointerContainer.find(".js-pointer-horizontal-helper");
        pointerVerticalHelper = pointerContainer.find(".js-pointer-vertical-helper");

        var touchInfoHTML = ich["touch-unit-info"](options);
        touchInfo = $(touchInfoHTML).appendTo(opt.touchSurface);
    };

    /**
     * Called to change the position of the unit.
     * @param  {Number} x X coordinate of the position
     * @param  {Number} y Y coordinate of the position
     */
    var changeUnitPosition = function(x, y, eventInfo) {

        if(lastAnimationReference) {
            window.cancelAnimationFrame(lastAnimationReference);
        }
        lastAnimationReference = window.requestAnimationFrame(function() {
            movePointerTo(x, y);
            updateTouchInfo(x, y, eventInfo);
        });
    };

    /**
     * Moves the pointer to a position
     * @param  {Number} x X coordinate of the position
     * @param  {Number} y Y coordinate of the position
     */
    var movePointerTo = function(x,y) {

        var pixelsX = viewportWidth*x;
        var pixelsY = viewportHeight*y;

        var newScale = ((1-y)*(MAX_SCALE_POINTER - MIN_SCALE_POINTER)) + MIN_SCALE_POINTER;
        var newTransformValue = "translate(" + pixelsX + "px, " + pixelsY + "px) scale(" + newScale + ")";

        pointer.css({
            "transform": newTransformValue,
            "-webkit-transform": newTransformValue,
            "-moz-transform": newTransformValue
        });

        var newXTransformValue = "translateX(" + pixelsX + "px)";
        pointerHorizontalHelper.css({
            "transform": newXTransformValue,
            "-webkit-transform": newXTransformValue,
            "-moz-transform": newXTransformValue
        });

        var newYTransformValue = "translateY(" + pixelsY + "px)";
        pointerVerticalHelper.css({
            "transform": newYTransformValue,
            "-webkit-transform": newYTransformValue,
            "-moz-transform": newYTransformValue
        });
    };

    /**
     * Updates the coordinates info
     * @param  {Number} x X coordinate of the position
     * @param  {Number} y Y coordinate of the position
     * @param  {Object} eventInfo infor about the event
     */
    var updateTouchInfo = function(x, y, eventInfo) {

        var prettyFreq = Math.round(eventInfo.frequency);
        touchInfo.html("" + prettyFreq + "Hz");

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

        pointerContainer.addClass("active");
        touchInfo.addClass("active");
        movePointerTo(eventInfo.relativeX, eventInfo.relativeY);
        updateTouchInfo(eventInfo.relativeX, eventInfo.relativeY, eventInfo);
    };

    /**
     * Called from outside to notify this module of the end of touch
     * @param  {Object} eventInfo Info related to the event
     */
    var notifyStop = function(eventInfo) {

        pointerContainer.removeClass("active");
        touchInfo.removeClass("active");
    };

    /**
     * Called from outside to notify this module of the movement of touch
     * @param  {Object} eventInfo Info related to the event
     */
    var notifyMovement = function(eventInfo) {

        changeUnitPosition(eventInfo.relativeX, eventInfo.relativeY, eventInfo);
    };

    return {
        notifyStart:    notifyStart,
        notifyStop:     notifyStop,
        notifyMovement: notifyMovement
    };
};