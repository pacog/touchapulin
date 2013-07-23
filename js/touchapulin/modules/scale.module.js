var Scale = function(options) {

    this._init(options);
};

Scale.prototype = {

    /**
     * Frequency to use for A4
     * @type {Number}
     */
    A4_FREQUENCY: 440,

    /**
     * Constant: the twelth root of 2
     * @type {Number}
     */
    TR2: 1.059463094359292364561825,

    /**
     * Defines for each octave, starting in the key of the interval, which semitones belong to the scale
     * @type {Object}
     */
    MODE_INTERVALS: {

        "chromatic":    [1,1,1,1,1,1,1,1,1,1,1,1],
        "major":        [1,0,1,0,1,1,0,1,0,1,0,1],
        "minor":        [1,0,1,0,1,0,1,1,0,1,0,1]
    },

    /**
     * First note of the scale
     * @type {String}
     */
    firstNote: "A4",

    /**
     * Last note of the scale
     * @type {String}
     */
    lastNote: "A6",

    /**
     * Key of the scale
     * @type {String}
     */
    key: "C",

    /**
     * Mode of the scale
     * @type {String}
     */
    mode: "major",

    /**
     * Frequency for the first note
     * @type {Number}
     */
    firstNoteFreq: null,

    /**
     * Frequency for the last note
     * @type {Number}
     */
    lastNoteFreq: null,

    /**
     * Total number of semitones in scale
     * @type {Number}
     */
    totalSemitones: 0,

    /**
     * Array of notes in the scale
     * @type {Array}
     */
    notes: [],

    /**
     * Constructor
     * @param  {Object} options Definition of the scale:
     *                          - firstNote Note on which the scale starts
     *                          - key Key of the scale
     *                          - mode "chromatic", "minor", "major"
     *                          - lastNote Note on which the scale ends
     *
     * @private
     */
    _init: function(options) {

        options = options || {};

        //Get parameters
        this.firstNote = options.firstNote || this.firstNote;
        this.lastNote = options.lastNote || this.lastNote;
        this.key = options.key || this.key;
        this.mode = options.mode || this.mode;

        //Calculate base frequencies
        this.firstNoteFreq = this._getFrequencyFromNote(this.firstNote);
        this.lastNoteFreq = this._getFrequencyFromNote(this.lastNote);

        //Store total semitones in scale
        var octave1 = this.firstNote.slice(-1);
        var note1 = this.firstNote.slice(0, this.firstNote.length - 1);
        var octave2 = this.lastNote.slice(-1);
        var note2 = this.lastNote.slice(0, this.lastNote.length - 1);
        this.totalSemitones = this._getSemitonesDifference(note1, octave1, note2, octave2);

        //Generate notes in the scale
        this.notes = this._generateNotes();
    },

    /**
     * Generates the notes that this scale has
     * @return {Array} Array with the notes
     */
    _generateNotes: function() {

        //Calculate the position of the first note within the octave
        var firstNote = this.firstNote.slice(0, this.firstNote.length - 1);
        var startPosition = this._getPositionInOctave(firstNote);
        var notes = [];
        var actualPosition = false;
        var scaleSemitones = this.MODE_INTERVALS[this.mode];

        for(var i=0; i<this.totalSemitones; i++) {

            actualPosition = (i + startPosition) % 12;
            if( scaleSemitones[actualPosition] ) {

                var noteToAdd = this._getNoteFromInterval(i);
                notes.push({

                    "note": noteToAdd,
                    "percentage": this._getPercentageFromNote(noteToAdd)
                });
            }
        }

        return notes;
    },

    /**
     * Gets the percentage on which a note should be painted in the screen
     * @param  {String} note The note
     * @return {Number}      Percentage, from 0 to 1
     */
    _getPercentageFromNote: function(note) {

        var octave1 = this.firstNote.slice(-1);
        var note1 = this.firstNote.slice(0, this.firstNote.length - 1);
        var octave2 = note.slice(-1);
        var note2 = note.slice(0, this.lastNote.length - 1);
        var semitones = this._getSemitonesDifference(note1, octave1, note2, octave2);

        return semitones/this.totalSemitones;
    },

    /**
     * Gets the note corresponding to add a certain number of semitones to the first note of the scale
     * TODO: not working for negative intervals yet
     * @param  {Number} interval Semitones to add (or substract if negative) to the first note of the scale
     * @return {String}          Note that in the interval
     */
    _getNoteFromInterval: function(interval) {


        var octave1 = parseInt(this.firstNote.slice(-1), 10);
        var note1 = this._getPositionInOctave(this.firstNote.slice(0, this.firstNote.length - 1));

        var intervalOctaves = Math.floor(interval/12);
        var intervalRest = interval % 12;

        var resultOctave = octave1 + intervalOctaves;

        var resultRest = note1 + intervalRest;
        if(resultRest >= 12) {

            resultRest = resultRest - 12;
            resultOctave ++;
        }
        var resultNote = this._getNoteFromPosition(resultRest);

        return resultNote + resultOctave;
    },

    /**
     * ReturnseFromPosi a list of notes for the defined scale, with their frequencies and percentages
     * related to a screen
     * @return {Array} Array containing the notes, ordered from lowest to highest
     */
    getNotes: function() {

        return this.notes;
    },


    /**
     * Retuns the frequency to play based on a percentage and the scale itself
     * @param  {Number} percentage Percentage, from 0 to 1
     * @return {Number}            Frequency to play, in Hz
     */
    getFrequencyFromPercentage: function(percentage) {

        var relativeSemitone = percentage * this.totalSemitones;

        return this.A4_FREQUENCY * Math.pow(this.TR2, relativeSemitone);
    },

    /**
     * Gets the frequency for a note
     * @param  {String} noteString  The note ("A5", "C3", ...)
     * @return {Number}             Frequency for that note, false if an error occurs
     */
    _getFrequencyFromNote: function(noteString) {

        //Last position will be the octave
        var octave = noteString.slice(-1);
        var note = noteString.slice(0, noteString.length - 1);

        var semitones = this._getSemitonesDifference("A", "4", note, octave);

        //Apply the formula from http://www.phy.mtu.edu/~suits/NoteFreqCalcs.html
        return this.A4_FREQUENCY * Math.pow(this.TR2, semitones);
    },

    /**
     * Returns the semitone difference between two notes
     * @param  {String} note1   The note of the first note (A, B, C...)
     * @param  {String} octave1 The octave of the first note
     * @param  {String} note2   The note of the second note
     * @param  {String} octave2 The octave of the second note
     * @return {Number}         Semitone difference between two notes
     */
    _getSemitonesDifference: function(note1, octave1, note2, octave2) {

        var octave1Int = parseInt(octave1, 10);
        var octave2Int = parseInt(octave2, 10);

        var difference = (octave2Int - octave1Int)*12; //12 semitones per octave

        var positionInOctave1 = this._getPositionInOctave(note1);
        var positionInOctave2 = this._getPositionInOctave(note2);

        difference = difference + positionInOctave2 - positionInOctave1;

        return difference;
    },

    /**
     * Gets the position in semitones of a note inside an octave from A to A
     * @param  {String} note The note
     * @return {Number}      The semitone position, from 0 to 11
     */
    _getPositionInOctave: function(note) {

        switch(note) {
            case "A":   return 9;
            case "A#":  return 10;
            case "B":   return 11;
            case "C":   return 0;
            case "C#":  return 1;
            case "D":   return 2;
            case "D#":  return 3;
            case "E":   return 4;
            case "F":   return 5;
            case "F#":  return 6;
            case "G":   return 7;
            case "G#":  return 8;
        }
        throw "ScaleModeule : _getPositionInOctave : trying to find position of bad note: " + note;
    },

    /**
     * Gets the note that is in a position (0 to 11) in a octave
     * @param  {Number} position The position (0 to 11)
     * @return {String}          Note in that position
     */
    _getNoteFromPosition: function(position) {

        switch(position) {
            case 9:     return "A";
            case 10:    return "A#";
            case 11:    return "B";
            case 0:     return "C";
            case 1:     return "C#";
            case 2:     return "D";
            case 3:     return "D#";
            case 4:     return "E";
            case 5:     return "F";
            case 6:     return "F#";
            case 7:     return "G";
            case 8:     return "G#";
        }
        throw "ScaleModeule : _getNoteFromPosition : trying to find not of bad position: " + position;
    }
};