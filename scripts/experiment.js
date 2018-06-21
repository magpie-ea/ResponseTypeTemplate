// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

    // specify view order
    this.views = [intro,
                  instructionsForcedChoice,
                  mainForcedChoice,
                  instructionsSliderRating,
                  mainSliderRating,
                  instructionsDropdownChoice,
                  mainDropdownChoice,
				  instructionsRatingScale,
                  mainRatingScale,
                  instructionsImageSelection,
                  mainImageSelection,
				  instructionsKeyPress,
                  mainKeyPress,
                  postTest,
                  thanks];

    // prepare information about trials (procedure)
    this.trial_info = prepareData();

    // This method uses external files instead.
    // this.trial_info = prepareDataFromCSV("trial_info/practiceTrials.csv", "trial_info/trials.csv");
	
};

// create and return an object ('data') where the experiment's info is stored
// include a placeholder exp.out in which to store participants' responses
var prepareData = function() {
    var trials = {};
    var shuffled;

	console.log(trials_raw)
	
    for (prop in trials_raw) {
        if (trials_raw.hasOwnProperty(prop)) {
            shuffled = _.shuffle(trials_raw[prop]);
            trials[prop] = shuffled;
        }
    }

    // variables `trials_raw` and `practice_trials` are defined in separate files
    // in folder `trial_info`
    var data = {
        // 'trials': _.shuffle(trials_raw),  // items in data.trials are shuffled randomly upon initialization
        'trials': trials,
        'practice_trials': practice_trials, // practice trials occur in the same order for all participants
        'out': [] // mandatory field to store results in during experimental trials
    };

    return data;
};
