//make our timers global variables
var questionTimeout;
var rightWrongTimeout;

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
    correctAnswer: "",
    timeLeft: 0,
    questionNumber: 0,

    //new question function to put questions up on screen
    newQuestion: function () {

        //if you have finished the last question
        if (quiz.questionNumber === 5) {
            $("#questions-right").text(quiz.points);
            $("#right-wrong").addClass("hide");
            $("#endgame").removeClass("hide");
        }

        //otherwise we give you a new question from the question object
        else {
            $("#qnumb").text(quiz.questionNumber + 1);
            $("#questnav").removeClass("hide");

            //puts question into question space
            $("#question").text(quiz.questions[quiz.questionNumber].question);

            //puts each answer in its proper div using a for loop because I'm trying to be fancy (please notice me, senpai)
            for (var i = 1; i <= 4; i++) {
                $("#a" + i).text(quiz.questions[quiz.questionNumber]["a" + i]);
            }

            //mark correct answer
            quiz.correctAnswer = quiz.questions[quiz.questionNumber].correct;

            //We make sure every div that should be hidden is
            $("#pregame").addClass("hide");
            $("#right-wrong").addClass("hide");
            $("#endgame").addClass("hide");

            // we show the quiz-game div
            $("#quiz-game").removeClass("hide");

            //we start the timer function
            quiz.timeLeft = 30;
            $("#time-left").text(quiz.timeLeft);
            questionTimeout = setInterval(quiz.questionTimer, 1000);
            rightWrongTimeout = setTimeout(quiz.timeout, 30000);
        }
    },

    //reset game function
    resetGame: function () {
        quiz.points = 0;
        quiz.questionNumber = 0;
        quiz.newQuestion();
    },

    //this is our timer
    questionTimer: function () {
        quiz.timeLeft--;
        $("#time-left").text(quiz.timeLeft);

    },

    //this is what happens when you select an answer
    questionSelect: function () {
        clearInterval(questionTimeout);
        clearTimeout(rightWrongTimeout);

        //if the answer is correct through looking at the correctAnswer div id
        if ($(this).is("#" + quiz.correctAnswer)) {
            quiz.points++;
            $("#correct-text").html("<h1>That answer is correct.</h1>");
            quiz.finishQuestion();
        }

        // if the answer is wrong
        else {
            $("#correct-text").html("<h1>You are gravely mistaken.</h1><br><h3>The correct answer was " + quiz.questions[quiz.questionNumber][quiz.correctAnswer] + ".</h3>");
            quiz.finishQuestion();
        }
    },

    //if you timeout
    timeout: function () {
        clearInterval(questionTimeout);
        $("#correct-text").html("<h1>You have RUN out of time.</h1><br><h3>The correct answer was " + quiz.questions[quiz.questionNumber][quiz.correctAnswer] + ".</h3>");
        quiz.finishQuestion();
    },

    //all the above three conditions funnel to this
    finishQuestion: function () {
        $("#fun-fact").text(quiz.questions[quiz.questionNumber].funFact);
        $("#gif").attr("src", quiz.questions[quiz.questionNumber].imgLoc);
        $("#quiz-game").addClass("hide");
        $("#right-wrong").removeClass("hide");
        quiz.questionNumber++;
        setTimeout(quiz.newQuestion, 10000);
    },
}

//how we make the game work
$(document).ready(function () {
    $(".new-game").click(quiz.resetGame);
    $(".answer").click(quiz.questionSelect);
});
