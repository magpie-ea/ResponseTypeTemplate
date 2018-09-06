var intro = {
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "This is a template to showcase different means of recording behavioral data.",
    // introduction's slide proceeding button text
    "buttonText": "Show me what you've got!",
    // render function renders the view
    render: function() {
        var view = {};
        view.name = 'intro';
        view.template = $('#intro-view').html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

        return view;
    },
    // for how many trials should this view be repeated?
    trials: 1
}

var instructionsForcedChoice = {
    "title": "Binary choice task with buttons",
    "text": "We start with a forced-choice task with two options. Click on a labelled button to select an option.",
    "buttonText": "Start binary choice task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
}

var mainForcedChoice = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-buttons-response').html();
        view.response = $('#response').html();
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.forcedChoice[CT].question,
            option1: exp.trial_info.trials.forcedChoice[CT].option1,
            option2: exp.trial_info.trials.forcedChoice[CT].option2,
            picture: exp.trial_info.trials.forcedChoice[CT].picture
        }));
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal
        // to the answer is added to the trial object
        // as well as a readingTimes property with value 
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT+1,
                question: exp.trial_info.trials.forcedChoice[CT].question,
                option1: exp.trial_info.trials.forcedChoice[CT].option1,
                option2: exp.trial_info.trials.forcedChoice[CT].option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};

var instructionsSliderRating = {
     // instruction's title
    "title": "Slider rating task",
    // instruction's text
    "text": "In the next part you will adjust sliders. You have to click or drag the slider button. Only if you do will a button appear that you need to click to proceed.",
    // instuction's slide proceeding button text
    "buttonText": "Start slider task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var instructionsTextboxInput = {
    "title": "Textbox Input Task",
    "text": "In this part, you will write a text in a textbox field. In order to proceed to the next slide, please provide at least 10 characters of text.",
    "buttonText": "Start textbox input task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var mainTextboxInput = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-textbox-input').html();
        view.response = $('#response').html();
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.textboxInput[CT].question,
            picture: exp.trial_info.trials.textboxInput[CT].picture
        }));
        var next = $('#next');
        var textInput = $('textarea');
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        // attaches an event listener to the textbox input
        textInput.on('keyup', function() {
            // if the text is longer than (in this case) 10 characters without the spaces
            // the 'next' button appears
            if (textInput.val().trim().length > 10) {
                next.removeClass('nodisplay');
            } else {
                next.addClass('nodisplay');
            }
        });

        // the trial data gets added to the trial object
        next.on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainTextboxInput",
                trial_number: CT+1,
                question: exp.trial_info.trials.textboxInput[CT].question,
                text_input: textInput.val().trim(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};

var mainSliderRating = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-slider-response').html();
        view.response = $('#response').html();
        var response;
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.sliderRating[CT].question,
            option1: exp.trial_info.trials.sliderRating[CT].option1,
            option2: exp.trial_info.trials.sliderRating[CT].option2,
            picture: exp.trial_info.trials.sliderRating[CT].picture
        }));
        startingTime = Date.now();
        response = $('#response');
        // updates the progress bar
        $('#filled').css('width', filled);

        // checks if the slider has been changed
        response.on('change', function() {
            $('#next').removeClass('nodisplay');
        });
        response.on('click', function() {
            $('#next').removeClass('nodisplay');
        });

        $('#next').on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainSliderRating",
                trial_number: CT+1,
                question: exp.trial_info.trials.sliderRating[CT].question,
                option1: exp.trial_info.trials.sliderRating[CT].option1,
                option2: exp.trial_info.trials.sliderRating[CT].option2,
                rating_slider: response.val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};

var instructionsDropdownChoice = {
     // instruction's title
    "title": "Drop-down menu selection",
    // instruction's text
    "text": "Select an option from a drop-down menu. Only after your selection will a button appear that allows you to proceed.",
    // instuction's slide proceeding button text
    "buttonText": "Start dropdown task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var mainDropdownChoice = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-dropdown-response').html();
        view.response = $('#response').html();
        var response;
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.dropdownChoice[CT].question,
            questionLeftPart: exp.trial_info.trials.dropdownChoice[CT].questionLeftPart,
            questionRightPart: exp.trial_info.trials.dropdownChoice[CT].questionRightPart,
            option1: exp.trial_info.trials.dropdownChoice[CT].option1,
            option2: exp.trial_info.trials.dropdownChoice[CT].option2,
            picture: exp.trial_info.trials.dropdownChoice[CT].picture
        }));
        startingTime = Date.now();
        response = $('#response');
        // updates the progress bar
        $('#filled').css('width', filled);

        response.on('change', function() {
            $('#next').removeClass('nodisplay');
        });

        $('#next').on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainDropdownChoice",
                trial_number: CT+1,
                question: exp.trial_info.trials.dropdownChoice[CT].question,
                option1: exp.trial_info.trials.dropdownChoice[CT].option1,
                option2: exp.trial_info.trials.dropdownChoice[CT].option2,
                dropdown_choice: $(response).val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};

var instructionsRatingScale = {
     // instruction's title
    "title": "Rating scale task",
    // instruction's text
    "text": "Next you will select a degree from a rating scale. Just click on your prefered number from 1 to 7.",
    // instuction's slide proceeding button text
    "buttonText": "Start rating task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var mainRatingScale = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-rating-response').html();
        view.response = $('#response').html();
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.ratingScale[CT].question,
            option1: exp.trial_info.trials.ratingScale[CT].option1,
            option2: exp.trial_info.trials.ratingScale[CT].option2,
            picture: exp.trial_info.trials.ratingScale[CT].picture
        }));
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal
        // to the answer is added to the trial object
        // as well as a readingTimes property with value 
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainRatingScale",
                trial_number: CT+1,
                question: exp.trial_info.trials.ratingScale[CT].question,
                option1: exp.trial_info.trials.ratingScale[CT].option1,
                option2: exp.trial_info.trials.ratingScale[CT].option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};

var instructionsSentenceChoice = {
     // instruction's title
    "title": "Sentence selection task",
    // instruction's text
    "text": "Next you will select a sentence from a set of given sentences.",
    // instuction's slide proceeding button text
    "buttonText": "Start sentence selection task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var mainSentenceChoice = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-sentence-choice').html();
        view.response = $('#response').html();
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.sentenceChoice[CT].question,
            option1: exp.trial_info.trials.sentenceChoice[CT].option1,
            option2: exp.trial_info.trials.sentenceChoice[CT].option2,
            picture: exp.trial_info.trials.sentenceChoice[CT].picture
        }));
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainTextChoice",
                trial_number: CT+1,
                question: exp.trial_info.trials.sentenceChoice[CT].question,
                option1: exp.trial_info.trials.sentenceChoice[CT].option1,
                option2: exp.trial_info.trials.sentenceChoice[CT].option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};

var instructionsImageSelection = {
     // instruction's title
    "title": "Image selection task",
    "text": "Just click on a picture.",
    "buttonText": "Start image selection task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var mainImageSelection = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-image-selection').html();
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.imageSelection[CT].question,
            option1: exp.trial_info.trials.imageSelection[CT].option1,
            option2: exp.trial_info.trials.imageSelection[CT].option2,
            picture1: exp.trial_info.trials.imageSelection[CT].picture1,
            picture2: exp.trial_info.trials.imageSelection[CT].picture2
        }));
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainImageSelection",
                trial_number: CT+1,
                question: exp.trial_info.trials.imageSelection[CT].question,
                option1: exp.trial_info.trials.imageSelection[CT].option1,
                option2: exp.trial_info.trials.imageSelection[CT].option2,
                picture1: exp.trial_info.trials.imageSelection[CT].picture1,
                picture2: exp.trial_info.trials.imageSelection[CT].picture2,
                image_selected: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};

var instructionsKeyPress = {
    "title": "Binary choice with keys",
    "text": "Make a binary choice by pressing keys 'f' or 'j'. Good method for reaction time measurements.",
    "buttonText": "Start key press task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        }); 

        return view;
    },
    trials: 1
};

var mainKeyPress = {
    render : function(CT) {
        var view = {};
        // what part of the progress bar is filled
        var filled = CT * (180 / exp.views[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-key-press').html();
        console.log(exp.trial_info.trials.keyPress[CT]);
        var key1 = exp.trial_info.trials.keyPress[CT].key1;
        var key2 = exp.trial_info.trials.keyPress[CT].key2;
        $('#main').html(Mustache.render(view.template, {
            question: exp.trial_info.trials.keyPress[CT].question,
            picture: exp.trial_info.trials.keyPress[CT].picture,
            key1: key1,
            key2: key2,
            value1: exp.trial_info.trials.keyPress[CT][key1],
            value2: exp.trial_info.trials.keyPress[CT][key2]
        }));
        startingTime = Date.now();
        // updates the progress bar
        $('#filled').css('width', filled);

        var handleKeyPress = function(e) {
            var keyPressed = String.fromCharCode(e.which).toLowerCase();

            if (keyPressed === key1 || keyPressed === key2) {
                var corectness;
                console.log(keyPressed);
                var RT = Date.now() - startingTime; // measure RT before anything else

                if (exp.trial_info.trials.keyPress[CT].expected === exp.trial_info.trials.keyPress[CT][keyPressed.toLowerCase()]) {
                    correctness = 'correct';
                } else {
                    correctness = 'incorrect';
                };

                trial_data = {
                    trial_type: "mainKeyPress",
                    trial_number: CT+1,
                    question: exp.trial_info.trials.keyPress[CT].question,
                    expected: exp.trial_info.trials.keyPress[CT].expected,
                    key_pressed: keyPressed,
                    correctness: correctness,
                    RT: RT
                };

                trial_data['key1'] = exp.trial_info.trials.keyPress[CT][key1];
                trial_data['key2'] = exp.trial_info.trials.keyPress[CT][key2];

                // question or/and picture are optional
                if (exp.trial_info.trials.keyPress[CT].picture !== undefined) {
                    trial_data['picture'] = exp.trial_info.trials.keyPress[CT].picture;
                }

                if (exp.trial_info.trials.keyPress[CT].question !== undefined) {
                    trial_data['question'] = exp.trial_info.trials.keyPress[CT].question;
                } 

                console.log(trial_data);
                exp.trial_data.push(trial_data);
                $('body').off('keydown', handleKeyPress);
                exp.findNextView();
            }   
        };

        $('body').on('keydown', handleKeyPress);

        return view;
    },
    trials: 2
};

var postTest = {
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    render : function() {
        var view = {};
        view.name = 'postTest';
        view.template = $('#post-test-view').html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

        return view;
    },
    trials: 1
};

var thanks = {
    "message": "Thank you for taking part in this experiment!",
    render: function() {
        var view = {};
        view.name = 'thanks';
        view.template = $('#thanks-view').html();

//        // construct data object for output
//        var data = {
//        'author': config_deploy.author,
//        'experiment_id': config_deploy.experiment_id,
//        'description': config_deploy.description,
//        'startDateTime': exp.startDate,
//        'total_exp_time_minutes': (Date.now() - exp.global_data.startTime) / 60000,
//        'trials': exp.trial_data
//        // 'worker_id': HITData['workerId'],
//        // 'assignmentId': HITData['assignmentId'],
//        // 'HIT_id': HITData['hitId']
//        };
//
//        // merge in global data accummulated so far
//        // this could be unsafe if 'exp.global_data' contains keys used in 'data'!!
//        data = _.merge(exp.global_data, data)

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(view.template, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(view.template, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(view.template, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

        return view;
    },
    trials: 1
}