var SoundOutputHandler = function(options) {

    /**
     * General synth used
     * @type {Object}
     */
    var synth = false;

    /**
     * Sine generator, part of the synth
     * @type {Object}
     */
    var sineGenerator = false;

    /**
     * Mediator to interact with the rest of the app
     * @type {Object}
     */
    var mediator = false;

    /**
     * Constructor
     * @param  {Object} options:
     *         - mediator: mediator to interact with the rest of the app
     */
    var init = function(options) {

        mediator = options.mediator;
        initSound();
        initEvents();
    };

    /**
     * Initializes the sound player
     */
    var initSound = function() {

        synth = new Audiolet();
        sineGenerator = new Sine(synth);
    };

    /**
     * Initializes all events we listen from the mediator
     */
    var initEvents = function() {

        mediator.subscribe("inputStarted", inputStartHandler);
        mediator.subscribe("inputEnded", inputEndHandler);
        mediator.subscribe("inputMove", inputMoveHandler);
    };

    /**
     * Handler for the start of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputStartHandler = function(x, y) {

        startPlaying();
    };

    /**
     * Handler for the end of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputEndHandler = function() {

        stopPlaying();
    };

    /**
     * Handler for the move of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputMoveHandler = function(x, y) {

        //TODO
    };


    /**
     * Starts playing the synth
     */
    var startPlaying = function() {

        sineGenerator.connect(synth.output);
    };

    /**
     * Stops playing the synth
     */
    var stopPlaying = function() {

        sineGenerator.disconnect(synth.output);
    };

    init(options);

    return {};
};