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
     * Scale module to use
     * @type {Object}
     */
    var scale = false;

    /**
     * General screen output module, will draw notes and other info
     * @type {Object}
     */
    var generalScreenOutputModule = false;

    /**
     * Constructor
     * @param  {Object} options:
     *         - mediator Mediator to communicate with the rest of the app
     *         - touchSurface surface where the touch is happening
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
        scale = options.scale;
        generalScreenOutputModule = options.generalScreenOutputModule;
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
        newTouchUnit.start(inputInfo);
    };

    /**
     * Handler for the end of an input
     * @param  {Object} inputInfo Info related with the input
     */
    var inputEndHandler = function(inputInfo) {

        var touchUnit = getUnitFromInfo(inputInfo);
        touchUnit.stop(inputInfo);
    };

    /**
     * Handler for the move of an input
     * @param  {Object} inputInfo Info related with the input
     */
    var inputMoveHandler = function(inputInfo) {

        var touchUnit = getUnitFromInfo(inputInfo);
        touchUnit.notifyMovement(inputInfo);
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

            throw "ERROR : TouchUnitManager : createNewTouchUnit : not enough touch units available";
        }

        delete touchUnits[unusedTouchUnit.getId()];
        unusedTouchUnit.updateData(inputInfo);
        touchUnits[unusedTouchUnit.getId()] = unusedTouchUnit;

        return unusedTouchUnit;
    };

    /**
     * Gets a unit based on information
     * @param  {Object} info Information about the unit we want to get
     * @return {Object}      The touch unit
     */
    var getUnitFromInfo = function(info) {

        var unit = touchUnits[info.identifier];
        if(unit) {

            return unit;
        } else {

            throw "ERROR : TouchUnitManager : getUnitFromInfo : trying to get a unit info that is not present";
        }
    };

    //TODO: create a general screen handler (from application?)

    init(options);

    return {};
};