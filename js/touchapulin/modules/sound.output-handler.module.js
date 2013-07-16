var SoundOutputHandler = function(options) {

    /**
     * Oscillator that will play the sound
     * @type {Object}
     */
    var myOscillator = false;

    /**
     * Controller for the gain
     * @type {Object}
     */
    var gainController = false;

    /**
     * Mediator to interact with the rest of the app
     * @type {Object}
     */
    var mediator = false;

    /**
     * Max frequency to play
     * @type {Number}
     */
    var minFrequency = 220;

    /**
     * Min frequency to play
     * @type {Number}
     */
    var maxFrequency = minFrequency*4;

    /**
     * Common Audio context from Web Audio API
     * @type {Object}
     */
    var myAudioContext = false;

    /**
     * Constructor
     * @param  {Object} options:
     *         - mediator: mediator to interact with the rest of the app
     */
    var init = function(options) {

        mediator = options.mediator;
        myAudioContext = options.audioContext;
        initSound();
        initEvents();
    };

    /**
     * Initializes the sound player
     */
    var initSound = function() {

        myOscillator = myAudioContext.createOscillator();
        myOscillator.type = myOscillator.SINE;
        gainController = myAudioContext.createGainNode();
        myOscillator.connect(gainController);
        gainController.connect(myAudioContext.destination);
        changeGain(0);
        myOscillator.noteOn(0);
    };

    /**
     * Initializes all events we listen from the mediator
     */
    var initEvents = function() {

        /*mediator.subscribe("inputStarted", inputStartHandler);
        mediator.subscribe("inputEnded", inputEndHandler);
        mediator.subscribe("inputMoved", inputMoveHandler);*/
    };

    /**
     * Handler for the start of an input
     * @param  {Number} x Position x of the input
     * @param  {Number} y Position y of the input
     */
    var inputStartHandler = function(x, y) {

        var frequency = getFrequency(x, y);
        startPlaying(frequency, 1 - y);
    };

    /**
     * Gets the frequency at which we should play, depneding on the coordinates
     * @param  {Number} x X coordinate
     * @param  {Number} y Y coordinate]
     * @return {[type]}   The frequenty (Hz)
     */
    var getFrequency = function(x, y) {

        return ((maxFrequency - minFrequency)*x) + minFrequency;
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
        changeGain(1 - y);
    };


    /**
     * Starts playing the synth
     * @param {Number} frequency new frequency in Hz
     * @param {Number} gain Gain, from 0 to 1
     */
    var startPlaying = function(frequency, gain) {

        changePlayingFrequency(frequency);
        changeGain(gain);

    };

    /**
     * Changes the gain of the oscillator
     * @param  {Number} gain New gain, from 0 to 1
     */
    var changeGain = function(gain) {

        gainController.gain.value = gain;
    };

    /**
     * Changes the frequency that the synth is playing
     * @param {Number} frequency new frequency in Hz
     */
    var changePlayingFrequency = function(frequency) {

        myOscillator.frequency.value = frequency;
    };

    /**
     * Stops playing the synth
     */
    var stopPlaying = function() {

        changeGain(0);
    };

    var notifyStart = function(eventInfo) {

        //TODO
    };

    var notifyStop = function(eventInfo) {

        //TODO
    };

    var notifyMovement = function(eventInfo) {

        //TODO
    };

    init(options);

    return {
        notifyStart:    notifyStart,
        notifyStop:     notifyStop,
        notifyMovement: notifyMovement
    };
};