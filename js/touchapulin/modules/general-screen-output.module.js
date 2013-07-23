var GeneralScreenOutputModule = function(options) {

    /**
     * Options of the module
     * @type {Object}
     */
    var opt = false;

    /**
     * Constructor
     * @param  {Object} myOptions Options:
     *                            - scale: scale module to use
     *                            - outputElement: element where we will output screen info
     * @return {[type]}           [description]
     */
    var init = function(myOptions) {

        opt = myOptions;
        createNoteGuides();
    };

    /**
     * Creates the guides for the notes specified in the scale
     */
    var createNoteGuides = function() {

        var notes = opt.scale.getNotes();
        for(var i=0; i<notes.length; i++) {
            notes[i].percentage = notes[i].percentage * 100;
        }
        var html = ich.notes({ notes: notes });
        opt.outputElement.append(html);
    };

    init(options);
    return {};
};