var SoundOutputHandler = function(options) {

    /**
     * Audio context form Web Audio API
     * @type {Object}
     */
    var myAudioContext = false;

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

        try {

            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            myAudioContext = new AudioContext();
        }
        catch(e) {

            alert('Web Audio API is not supported in this browser');
            return false;
        }
        myOscillator = myAudioContext.createOscillator();
        myOscillator.type = myOscillator.SINE;
        gainController = myAudioContext.createGain();
        myOscillator.connect(gainController);
        gainController.connect(myAudioContext.destination);
        gainController.gain.value = 0;
        myOscillator.start(0);
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

        changePlayingFrequency(frequency);
        gainController.gain.value = 1;

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

        gainController.gain.value = 0;
    };

    init(options);

    return {};
};