const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextButton = document.getElementById("next");

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
];

let currentIndex = 0;

function showQuestion() {
  answers.innerHTML = "";
  const currentQuestion = questions[currentIndex];
  question.innerText = currentIndex + 1 + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    answers.appendChild(btn);
  });
}

function setAnswer(pAnswer = "") {
  const currentQuestion = questions[currentIndex];

  currentQuestion.answers.forEach((answer, index) => {
    answers.children[index].disabled = true;

    if (pAnswer === answer.text) {
      //Selected button
      answers.children[index].classList.add("selected");
    }
    if (answer.correct) {
      answers.children[index].classList.add("correct");
    }
  });
  nextButton.disabled = false;
}

answers.addEventListener("click", function (e) {
  setAnswer(e.target.innerHTML);
});

showQuestion();
// setAnswer("Berlin");
