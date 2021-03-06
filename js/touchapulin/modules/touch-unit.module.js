/**
 * Module that represents a touch unit. It will receive notifications when it has to be started
 * and stopped, and when it moves, and it will take care of handling the output.
 */
var TouchUnit = function(options, idSeed) {

    this.init(options, idSeed);
};

TouchUnit.prototype = {

    /**
     * If of the unir
     * @type {Number}
     */
    id: false,

    /**
     * Flag to store the state of the unit
     * @type {Boolean}
     */
    active: false,

    /**
     * Stores the latest input, so we can measure speeds
     * @type {Object}
     */
    latestInput: false,

    /**
     * Scale module to use
     * @type {Object}
     */
    scale: false,

    /**
     * Constructor
     * @param  {Object} options TODO:
     * @param  {String} idSeed  Seed to generate the first id.
     */
    init: function(options, idSeed) {

        this.id = "TouchUnit" + idSeed;
        this.outputHandler = new OutputHandler(options);
        this.scale = options.scale;
    },

    /**
     * Returns the id of the unit
     * @return {Number} id of the unit
     */
    getId: function(){

        return this.id;
    },

    /**
     * Updates the data of the unit
     * @param  {Object} newData New data to use
     */
    updateData: function(newData) {

        this.id = newData.identifier;
        this.latestInput = newData;
    },

    /**
     * Checks if the unit is active or not
     * @return {Boolean} true if the unit is active, false otherwise
     */
    isActive: function() {

        return this.active;
    },

    /**
     * Starts the unit
     * @param  {Object} eventInfo Info about the event
     */
    start: function(eventInfo) {

        this.active = true;
        this._addFrequencyToEventInfo(eventInfo);
        this.outputHandler.notifyStart(eventInfo);
        this.latestInput = eventInfo;
    },

    /**
     * Stops the unit
     * @param  {Object} eventInfo Info about the event
     */
    stop: function(eventInfo) {

        this.active = false;
        this._addFrequencyToEventInfo(eventInfo);
        this.outputHandler.notifyStop(eventInfo);
        this.latestInput = eventInfo;
    },

    /**
     * Moves the unit
     * @param  {Object} eventInfo Info about the event
     */
    notifyMovement: function(eventInfo) {

        this._addFrequencyToEventInfo(eventInfo);
        this.outputHandler.notifyMovement(eventInfo);
        this.latestInput = eventInfo;
    },

    /**
     * Adds frequency information to the eventInfo
     * @param  {Object} eventInfo Event info where we will add the frequency information
     */
    _addFrequencyToEventInfo: function(eventInfo) {

        eventInfo.frequency = this.scale.getFrequencyFromPercentage(eventInfo.relativeX);
    },

    /**
     * Destroys the unit
     */
    destroy: function() {

        //TODO
    }
};