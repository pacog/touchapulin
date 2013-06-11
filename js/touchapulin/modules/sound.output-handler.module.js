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
        mediator.subscribe("inputMoved", inputMoveHandler);
    };

    /**
     * Handler for the start of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputStartHandler = function(x, y) {

        var frequency = getFrequency(x, y);
        startPlaying(frequency);
    };

    /**
     * Gets the frequency at which we should play, depneding on the coordinates
     * @param  {Number} x X coordinate
     * @param  {Number} y Y coordinate]
     * @return {[type]}   The frequenty (Hz)
     */
    var getFrequency = function(x, y) {

        return 440 + x;
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

        var frequency = getFrequency(x, y);
        changePlayingFrequency(frequency);
    };


    /**
     * Starts playing the synth
     * @param {Number} frequency new frequency in Hz
     */
    var startPlaying = function(frequency) {

        sineGenerator = new Sine(synth, frequency);
        sineGenerator.connect(synth.output);
    };

    /**
     * Changes the frequency that the synth is playing
     * @param {Number} frequency new frequency in Hz
     */
    var changePlayingFrequency = function(frequency) {

        sineGenerator.disconnect(synth.output);
        sineGenerator = new Sine(synth, frequency);
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