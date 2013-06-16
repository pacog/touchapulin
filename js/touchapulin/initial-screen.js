/**
 * Initial screen that will be shown when we want the user to input so it generates
 * a sound, thus enabling the web sound api in touch devices
 * @param  {Object} options Options, see constructor
 */
var InitialScreen = function(options) {

    /**
     * Stores the callback that should be made once the touch has happened
     * @type {Function}
     */
    var callback = false;

    /**
     * Stores the element with the screen that should be shown, then destroyed
     * @type {Element}
     */
    var screenElement = false;

    /**
     * Constructor, will check if the screen is needed, show it if so, and listen to the event to close it
     * It will call a callback method when ready, if no touch is needed, right away.
     * @param  {Object} opt Options
     *                      - callback: function to call when the touch has happened
     *                      - screenElement: element having the screen that will be shown, then destroyed
     */
    var init  = function(opt) {

        if(Modernizr.touch) {

            screenElement = opt.screenElement;
            callback = opt.callback;

            screenElement.addClass("show");
            screenElement.on("touchend", touchHappened);
        } else {

            opt.callback();
        }
    };

    var touchHappened = function() {

        var myAudioContext;
        try{
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            myAudioContext = new window.AudioContext();
        }
        catch(e) {

            alert('Web Audio API is not supported in this browser');
            return false;
        }
        try {
            alert("0");
            var myOscillator = myAudioContext.createOscillator();
            alert("1");
            myOscillator.type = myOscillator.SINE;
            alert("2");
            var gainController = myAudioContext.createGain();
            alert("3");
            myOscillator.connect(gainController);
            alert("4");
            gainController.connect(myAudioContext.destination);
            alert("5");
            gainController.gain.value = 0.1;
            alert("6");
            myOscillator.start(0);
            alert("7");
            myOscillator.stop(0);
            alert("8");
            gainController.disconnect(myAudioContext.destination);
            alert("9");

            screenElement.off("touchend", touchHappened);
            alert("a");
            screenElement.remove();
            alert("b");
            callback();
            alert("c");
            event.preventDefault();
            alert("d");
            return false;
        }
        catch(e) {

            alert('Something went wrong: ' + e);
            return false;
        }
    };

    init(options);
};