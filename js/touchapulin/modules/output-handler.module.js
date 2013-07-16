var OutputHandler = function(options) {

    var mediator = false;

    /**
     * Module that will handle all outputs in the screen
     * @type {Object}
     */
    var screenOutputHandler = false;

    /**
     * Module tha will handle all outputs as sound
     * @type {Boolean}
     */
    var soundOutputHandler = false;

    /**
     * Constructor of the app
     */
    var init = function(options) {

        mediator = options.mediator;

        screenOutputHandler = new ScreenOutputHandler({
            mediator:       mediator,
            touchSurface:   options.touchSurface
        });

        soundOutputHandler = new SoundOutputHandler({
            mediator:       mediator,
            audioContext:   options.audioContext
        });
    };

    var notifyStart = function(eventInfo) {

        screenOutputHandler.notifyStart(eventInfo);
        soundOutputHandler.notifyStart(eventInfo);
    };

    var notifyStop = function(eventInfo) {

        screenOutputHandler.notifyStop(eventInfo);
        soundOutputHandler.notifyStop(eventInfo);
    };

    var notifyMovement = function(eventInfo) {

        screenOutputHandler.notifyMovement(eventInfo);
        soundOutputHandler.notifyMovement(eventInfo);
    };

    init(options);

    return {
        notifyStart:    notifyStart,
        notifyStop:     notifyStop,
        notifyMovement: notifyMovement
    };
};