///Creation of Constant for Highscore list to display
const highScoresList = document.getElementById("highScoresList");

//retrieving highscore elements form high score
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Displaying the top 5 high scores marks and username
highScoresList.innerHTML = highScores.map( score => {
    return `<li class="high-Score">${score.name} - ${score.score}</li>`
}).join("");