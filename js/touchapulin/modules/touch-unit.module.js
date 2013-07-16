var TouchUnit = function(options, idSeed) {

    this.init(options, idSeed);
};

TouchUnit.prototype = {

    id: false,
    active: false,
    latestInput: false,

    init: function(options, idSeed) {

        this.id = "TouchUnit" + idSeed;
        this.outputHandler = new OutputHandler(options);
    },


    getId: function(){

        return this.id;
    },

    updateData: function(newData) {

        this.id = newData.identifier;
        this.latestInput = newData;
    },

    isActive: function() {

        return this.active;
    },

    start: function(eventInfo) {

        //TODO
        this.active = true;
        this.outputHandler.notifyStart(eventInfo);
    },

    stop: function(eventInfo) {

        this.active = false;
        this.outputHandler.notifyStop(eventInfo);
    },

    notifyMovement: function(eventInfo) {

        this.outputHandler.notifyMovement(eventInfo);
    },

    destroy: function() {

    }
};