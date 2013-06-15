var Touchapulin = function() {

    /**
     * Allows communications between modules.
     * @type {Object}
     */
    var mediator = false;

    /**
     * Module that handles all inputs
     * @type {Object}
     */
    var inputHandler = false;

    /**
     * Module that handles all possible outputs
     * @type {Object}
     */
    var outputHandler = false;

    /**
     * Constructor of the app
     */
    var init = function() {

        new InitialScreen({
            screenElement: $(".js-initial-screen"),
            callback: startApplication
        });
    };

    /**
     * Starts the application, called when everything is ready
     */
    var startApplication = function() {

        mediator = new Mediator();

        inputHandler = new InputHandler({
            mediator: mediator,
            touchSurface:   $(".js-touch-surface")
        });

        outputHandler = new OutputHandler({
            mediator: mediator,
            touchSurface:   $(".js-touch-surface"),
            pointer:        $(".js-pointer"),
            xCoord:         $(".js-x-coord"),
            yCoord:         $(".js-y-coord")
        });
    };

    return {
        init: init
    };
};