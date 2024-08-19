// Creating constants for fetching username,save button, finalscore display
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalscore");

//Retrieving data from local storage for scores which stores values of past entries
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || []
const MAX_HIGHSCORES = 5

//updating the score as final score
finalScore.innerText = mostRecentScore;

//snippet for username should not be null
username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled = !username.value;
})

//snippet for dssabling the save button when username is not entered
saveHighScore = e => {
    e.preventDefault();

    //creation of object for current user and score
    const user_score = {
        score: mostRecentScore,
        name: username.value
    };
    //pushing them onto highscores array for leaderboard
    highScores.push(user_score)

    //Sorting the array in decensing order with 5 maximum values
    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(MAX_HIGHSCORES);

    //updating local storage for highscores
    localStorage.setItem("highScores",JSON.stringify(highScores));

    //After save button is triggered it should redirect to home page
    window.location.assign("/");
}