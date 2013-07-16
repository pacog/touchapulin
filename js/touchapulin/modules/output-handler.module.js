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
            touchSurface:   options.touchSurface,
            pointer:        options.pointer,
            xCoord:         options.xCoord,
            yCoord:         options.yCoord
        });

        soundOutputHandler = new SoundOutputHandler({
            mediator:       mediator,
            audioContext:   options.audioContext
        });
    };

    init(options);
};