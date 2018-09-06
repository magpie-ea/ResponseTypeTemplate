// if there is more than 1 type of task
// we need to separate them because they might have different props (for example, two iamges)
// thus, shuffling the list of items might result in the wrong trials displayed by the view
// the other option is having each type of trial in a separate list
var main_trials = {
    // forced choice
    forcedChoice: [
        {question: "How are you today?", option1: "fine", option2: "great", picture: "images/question_mark_01.png"},
        {question: "What is the weather like?", option1: "shiny", option2: "rainbow", picture: "images/question_mark_02.png"}
    ],
    // textbox input
    textboxInput: [
        {question: "How are you today?", picture: "images/question_mark_01.png"},
        {question: "What is the weather like?"}
    ],
    // slider raiting
    sliderRating: [
        {question: "How are you today?", option1: "fine", option2: "great", picture: "images/question_mark_01.png"},
        {question: "What is the weather like?", option1: "shiny", option2: "rainbow", picture: "images/question_mark_02.png"}
    ],
    // dropdown choice
    dropdownChoice: [
        {question: "Today I feel", option1: "fine", option2: "great", picture: "images/question_mark_01.png"},
        {questionLeftPart: "The weather is", questionRightPart: "today", option1: "shiny", option2: "rainbow", picture: "images/question_mark_02.png"}
    ],
    sentenceChoice: [
        {question: "fine", option1: "How are you today?", option2: "What is the weather like?"},
        {question: "ham", option1: "What's on the bread?", option2: "Where is my head?", picture: "images/question_mark_02.png"}
    ],
    ratingScale: [
        {question: "Today I feel", option1: "fine", option2: "great", picture: "images/question_mark_01.png"},
        {question: "What is the weather like?", option1: "shiny", option2: "rainbow", picture: "images/question_mark_02.png"}
    ],
    // image selection
    imageSelection: [
        {question: "How are you today?", option1: "fine", picture1: "images/question_mark_02.png", option2: "great", picture2: "images/question_mark_01.png"},
        {question: "What is the weather like?", option1: "shiny", picture1: "images/question_mark_03.jpg", option2: "rainbow", picture2: "images/question_mark_04.png"}
    ],
    keyPress: [
        {picture: "images/question_mark_02.png", key1: "f", key2: "j", f: "fine", j: "great", expected: "great"},
        {question: "What is the weather like?", key1: "f", key2: "j", f: "shiny", j: "rainbow", expected: "shiny"},
        {question: "What's on the bread?", picture: "images/question_mark_04.png", key1: "f", key2: "j", f: "ham", j: "jam", expected: "jam"}
    ]
};