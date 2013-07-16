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

    start: function() {

        //TODO
        this.active = true;
    },

    destroy: function() {

    }
};