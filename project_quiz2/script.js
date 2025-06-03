const quizData = [
  {
    question: "What color is the sun?",
    answers: {
      a: "Yellow",
      b: "Blue",
      c: "Green"
    },
    correct: "a"
  },
  {
    question: "Which animal says 'Woof'?",
    answers: {
      a: "Cat",
      b: "Cow",
      c: "Dog"
    },
    correct: "c"
  },
  {
    question: "How many legs does a spider have?",
    answers: {
      a: "6",
      b: "8",
      c: "10"
    },
    correct: "b"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-button");
const finalScoreEl = document.getElementById("final-score");

function loadQuestion() {
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  for (let key in q.answers) {
    const btn = document.createElement("button");
    btn.textContent = `${key}: ${q.answers[key]}`;
    btn.onclick = () => handleAnswer(key);
    answersEl.appendChild(btn);
  }
}

function handleAnswer(selected) {
  const correct = quizData[currentQuestion].correct;
  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
    score++;
  } else {
    feedbackEl.textContent = `❌ Oops! The correct answer was "${correct}: ${quizData[currentQuestion].answers[correct]}"`;
    feedbackEl.style.color = "red";
  }

  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent.startsWith(correct)) {
      btn.style.backgroundColor = "#55efc4"; // highlight correct
    }
  });

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  document.getElementById("question-container").style.display = "none";
  nextBtn.style.display = "none";
  finalScoreEl.style.display = "block";
  finalScoreEl.innerHTML = `<h2>You got ${score} out of ${quizData.length} correct! 🥳</h2>`;
}

loadQuestion();
