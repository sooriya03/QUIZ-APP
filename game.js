// Creating Question constant and getting by Id collector
const question = document.getElementById("question");

// Getting choices in an array and getting by Class Collector
const choices = Array.from(document.getElementsByClassName("choice-text"));

// Getting question Number from div element
const questionCounterText = document.getElementById("questionCounter");

//Getting score from div element
const scoreText = document.getElementById("score")

// Getting loader from div element
const loader = document.getElementById("loader");

// Getting game id from div element
const game = document.getElementById("game")

// Creating question,scores,answeracceptance,question counter
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;

//Creating available question on an empty array
let availabeQuestion  = [];

// Creating questions array that should be displayed and maximum questions present
let questions = [];
let MAX_QUESTIONS = 0;

//fetching JSON file which holds questions,choices and answer
fetch("Questions.json").then(res => {
    return res.json()
}).then(loadedQuestions => {
    questions = loadedQuestions;
    MAX_QUESTIONS= loadedQuestions.length
    startGame();
}).catch(err => {
    console.error(err)
})

// Creating constants for assigning score
let MAX_BONUS = 0;

//Arrow function to start game
//initalizing question counter,score to 0,calling newquestion method 
startGame = ()=> {
    
    score = 0;
    questionCounter = 0;
    availabeQuestion = [...questions];
    game.classList.remove("hidden")
    loader.classList.add("hidden")
    getNewQuestion();
}

// Arrow function to get new question
getNewQuestion = ()=> {

    // Initial checking if all the questions is finished or answered
    if(availabeQuestion === 0 || questionCounter >= MAX_QUESTIONS)
    {   
        localStorage.setItem("mostRecentScore",MAX_BONUS)
        return window.location.assign("/end.html");
    }

    // incrementing the question counter and diplaying them 
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`
    scoreText.innerText = `${MAX_BONUS}`;

    //Random order of questions is generated here and displayed
    const questionIndex = Math.floor(Math.random() * availabeQuestion.length);
    currentQuestion = availabeQuestion[questionIndex]
    question.innerText = currentQuestion.question
    
    //Assigning choices with correct answers for them
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availabeQuestion.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click",e => {
        if(!acceptingAnswers) return ;

        //fetching dataset number from the html
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //Checking the correctnesss and assigning mark to that question
        let classToApply = "incorrect"
        if(selectedAnswer == currentQuestion.answer)
        {
            classToApply = "correct"
            MAX_BONUS += 10;
        }

        //fadeout of correctness by green or red displaying effect
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
});
