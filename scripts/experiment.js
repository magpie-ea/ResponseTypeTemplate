// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

    // specify view order
    this.views_seq = [intro,
                      instructionsForcedChoice,
                      mainForcedChoice,
                      instructionsTextboxInput,
                      mainTextboxInput,
                      instructionsSliderRating,
                      mainSliderRating,
                      instructionsDropdownChoice,
                      mainDropdownChoice,
                      instructionsRatingScale,
                      mainRatingScale,
                      instructionsSentenceChoice,
                      mainSentenceChoice,
                      instructionsImageSelection,
                      mainImageSelection,
                      instructionsKeyPress,
                      mainKeyPress,
                      postTest,
                      thanks];


    // prepare information about trials (procedure)
    // randomize main trial order, but keep practice trial order fixed
    this.trial_info.main_trials = main_trials;
    
    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ['mainForcedChoice',
                            'mainTextboxInput',
                            'mainSliderRating',
                            'mainDropdownChoice',
                            'mainRaitingScale',
                            'mainSentenceChoice',
                            'mainImageSelection',
                            'mainKeyPress'];
    // styles: chunks, separate or default
    this.progress_bar_style = 'default';
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
