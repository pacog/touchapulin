var TouchUnitManager = function(options) {

    /**
     * Maximun number of touch inputs we expect
     * @type {Number}
     */
    var MAX_TOUCH_UNITS = 10;

    /**
     * Module that handles all possible outputs
     * @type {Object}
     */
    var outputHandler = false;

    /**
     * Hash with all the touch units
     * @type {Object}
     */
    var touchUnits = false;

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
     * Common Audio context from Web Audio API
     * @type {Object}
     */
    var myAudioContext = false;

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

        try {

            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            myAudioContext = new AudioContext();
        }
        catch(e) {

            alert('Web Audio API is not supported in this browser');
            return false;
        }
        mediator = options.mediator;
        opt = options;
        options.audioContext = myAudioContext;
        initEvents();
        touchUnits = {};

        for(var i=0; i<MAX_TOUCH_UNITS; i++){

            var newTouchUnit = new TouchUnit(options, i);
            touchUnits[newTouchUnit.getId()] = newTouchUnit;
        }
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
     * @param  {Object} inputInfo Info related with the input
     */
    var inputStartHandler = function(inputInfo) {

        var newTouchUnit = createNewTouchUnit(inputInfo);
        newTouchUnit.start();
        debugger;
        //debugger;
/*        opt.touchSurface.addClass("touching");
        movePointerTo(x, y);
        updateTouchInfo(x, y);*/
    };

    /**
     * Handler for the end of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputEndHandler = function() {

        //opt.touchSurface.removeClass("touching");
    };

    /**
     * Handler for the move of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputMoveHandler = function(x, y) {

        /*if(lastAnimationReference) {
            window.cancelAnimationFrame(lastAnimationReference);
        }
        lastAnimationReference = window.requestAnimationFrame(function() {
            movePointerTo(x, y);
            updateTouchInfo(x, y);
        });*/
    };

    /**
     * Creates a new touch unit based on a input event
     * @param  {Object} inputInfo Info about the event, normally a touch start one
     * @return {Object}           Touch unit created
     */
    var createNewTouchUnit = function(inputInfo) {


        //Find an unused touch unit
        var unusedTouchUnit;
        $.each(touchUnits, function(index, unit) {

            if(!unit.isActive()) {

                unusedTouchUnit = unit;
                return false;
            }
        });

        if(!unusedTouchUnit) {

            throw "ERROR: not enough touch units available";
        }

        touchUnits[unusedTouchUnit.getId()] = false;
        unusedTouchUnit.updateData(inputInfo);
        touchUnits[unusedTouchUnit.getId()] = unusedTouchUnit;

        return unusedTouchUnit;
    };

    init(options);

    return {};
};