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
     * Gets the frequency at which we should play, depneding on the coordinates
     * @param  {Object} eventInfo Info about the event
     * @return {Number}   The frequenty (Hz)
     */
    var getFrequency = function(eventInfo) {

        return eventInfo.frequency;
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

    /**
     * Called from outside to notify this module of the start of touch
     * @param  {Object} eventInfo Info related to the event
     */
    var notifyStart = function(eventInfo) {


        var frequency = getFrequency(eventInfo);
        startPlaying(frequency, 1 - eventInfo.relativeY);
    };

    /**
     * Called from outside to notify this module of the end of touch
     * @param  {Object} eventInfo Info related to the event
     */
    var notifyStop = function(eventInfo) {

        stopPlaying();
    };

    /**
     * Called from outside to notify this module of the movement of touch
     * @param  {Object} eventInfo Info related to the event
     */
    var notifyMovement = function(eventInfo) {

        var frequency = getFrequency(eventInfo);
        changePlayingFrequency(frequency);
        changeGain(1 - eventInfo.relativeY);
    };

    init(options);

    return {
        notifyStart:    notifyStart,
        notifyStop:     notifyStop,
        notifyMovement: notifyMovement
    };
};