let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
    const response = await fetch("questions.json");
    const data = await response.json();
    questions = data;
    displayQuestion();
}

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const choices = document.getElementsByClassName("choice");

    questionElement.textContent = questions[currentQuestionIndex].question;

    for (let i = 0; i < choices.length; i++) {
        choices[i].textContent = questions[currentQuestionIndex].choices[i];
    }
}

function checkAnswer(index) {
    if (questions[currentQuestionIndex].correctAnswer === index) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
    } else {
        displayQuestion();
    }
}

function endQuiz() {
    document.getElementById("quiz").hidden = true;
    document.getElementById("result").hidden = false;
    document.getElementById("score").textContent = `${score}/${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz").hidden = false;
    document.getElementById("result").hidden = true;
    displayQuestion();
}

fetchQuestions();
