const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextButton = document.getElementById("next");
const summary = document.getElementsByClassName("summary")[0];
let questions = [];

function ConvertToQuestion(results) {
  return results.map((q) => {
    const _answers = [
      { text: q.correct_answer, correct: true },
      ...q.incorrect_answers.map((ans) => ({
        text: ans,
        correct: false,
      })),
    ];

    // Optional: shuffle _answers
    for (let i = _answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_answers[i], _answers[j]] = [_answers[j], _answers[i]];
    }

    return {
      question: q.question,
      answers: _answers,
    };
  });
}

async function LoadQuestions() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=15&difficulty=easy&type=multiple"
  );
  const data = await response.json();

  questions = ConvertToQuestion(data.results);
}

let currentIndex = 0;
let score = 0;

function showQuestion() {
  //Resets
  if (currentIndex >= questions.length) {
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
  }

  //Regular or Next questions
  summary.hidden = true;
  nextButton.disabled = true;
  answers.innerHTML = "";
  const currentQuestion = questions[currentIndex];
  question.innerHTML = currentIndex + 1 + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = answer.text;
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
      if (answer.correct) {
        score++;
      }
    }
    if (answer.correct) {
      answers.children[index].classList.add("correct");
    }
  });
  nextButton.disabled = false;
  currentIndex++;

  //Last question answer / To Reset
  if (currentIndex >= questions.length) {
    nextButton.innerHTML = "Reset";
    summary.innerHTML = `You got ${score} of ${questions.length} Questions`;
    summary.hidden = false;
  }
}

answers.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    setAnswer(e.target.innerHTML);
  }
});

async function initQuiz() {
  console.log("loading");
  await LoadQuestions();
  console.log("showing");
  showQuestion();
}

initQuiz();
