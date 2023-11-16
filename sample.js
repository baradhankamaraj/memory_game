const urlParams = new URLSearchParams(window.location.search);
const finalScore = document.getElementById("finalScore");
const finalTimer = document.getElementById("finalTimer");
const score = urlParams.get("score");
const minTime = urlParams.get("minuteTime");
const secTime = urlParams.get("secondTime");
finalScore.textContent = "Score:" + score;
finalTimer.textContent = `Time:${minTime}:${secTime}`;

