//make our timers global variables
var questionTimeout;
var rightWrongTimeout
// we're gonna try to build our game inside of this object and see what happens
var quiz = {
    // our questions go here
    questions: [
        { question: "Who was the first HHN Icon?", a1: "Jack the Clown", a2: "The Crypt-Keeper", a3: "The Caretaker", a4: "Bloody Mary", correct: "a2", funFact: "The Crypt-Keeper originally appeared on HBO's Tales From the Crypt, which aired from 1989 to 1996.", imgLoc: "assets/images/cryptkeeper.gif" },
        { question: "What was the only HHN Orlando house to be repeated almost exactly the same way twice?", a1: "An American Werewolf in London", a2: "The Screamhouse", a3: "Body Collectors", a4: "The Walking Dead", correct: "a1", funFact: "The house first premiered in 2013 and was brought back for the event's 25th anniversary in 2015.", imgLoc: "assets/images/werewolf.gif" },
        { question: "Which of these houses were NEVER also a scarezone during the history of HHN?", a1: "Asylum in Wonderland", a2: "PsychoScareapy", a3: "All Nite Die-In", a4: "RUN", correct: "a4", funFact: "The original RUN in 2001 was originally supposed to be the centerpiece hosue for that year's original icon, Eddie.", imgLoc: "assets/images/runchance.gif" },
        { question: "The first year of Universal Orlando's annual halloween event was called what?", a1: "Universal's Halloween Horror Nights", a2: "Universal's Fright Nights", a3: "Universal's Halloween Spooktacular", a4: "Universal's Monster Mash Ball", correct: "a2", funFact: "The first Fright Nights in 1991 only had one house, The Dungeon of Terror. The event wouldn't be called Halloween Horror Nights until the next year, 1992.", imgLoc: "assets/images/barmitzvah.gif" },
        { question: "Which HHN icon has never been given their own year to be the mascot of?", a1: "Lady Luck", a2: "The Caretaker", a3: "Cindy", a4: "The Usher", correct: "a3", funFact: "Cindy was originally slated to be the icon of HHN 12: Islands of Fear in 2002, before a string of child kidnappings in the area made Universal flesh out her father, The Caretaker, and make him the icon instead.", imgLoc: "assets/images/caretaker.gif" }
    ],
    // set our points and question # and correct answer and time left variables
    points: 0,
    questionNumber: 0,
    correctAnswer: "",
    timeLeft: 30,
    //reset game function
   
    //new question function to put questions up on screen
    newQuestion: function() {
        var questionNumber = quiz.questionNumber;
        //puts question into question space
        $("#question").text(quiz.questions[questionNumber].question);
        
        //puts each answer in its proper div
        for (var i = 1; i <= 4; i++) {
            
            $("#a" + i).text(quiz.questions[questionNumber]["a" + i]);
        }

        //mark correct answer
        quiz.correctAnswer = quiz.questions[questionNumber].correct;

        //We make sure every div that should be hidden is
        $("#pregame").addClass("hide");
        $("#right-wrong").addClass("hide");
        $("#endgame").addClass("hide");

        // we show the quiz-game div
        $("#quiz-game").removeClass("hide");

        //we start the timer function
        quiz.timeLeft = 30;
        questionTimeout = setInterval(quiz.questionTimer(), 1000);

    },
    resetGame: function() {
        quiz.points = 0;
        quiz.questionNumber = 0;
        quiz.newQuestion();
    },
    questionTimer: function(){
        quiz.timeLeft --;
        $("#time-left").text(quiz.timeleft)
        if (quiz.timeLeft == 0) {
            quiz.timeout();
        }
    },

}