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
     * Module that handles the different sound units we have. Each unit will respond to
     * a interaction, like a touch
     * @type {Object}
     */
    var touchUnitManager = false;

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

        touchUnitManager = new TouchUnitManager({
            mediator: mediator,
            touchSurface:   $(".js-touch-surface")
        });

        var scale = new Scale();
        var notes = scale.getNotes();
    };

    return {
        init: init
    };
};