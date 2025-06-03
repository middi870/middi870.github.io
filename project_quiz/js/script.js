const quizData = [
  {
    question: "What is the color of the sky?",
    answers: {
      a: "Blue",
      b: "Green",
      c: "Red"
    },
    correctAnswer: "a"
  },
  {
    question: "Which animal says 'Meow'?",
    answers: {
      a: "Dog",
      b: "Cat",
      c: "Cow"
    },
    correctAnswer: "b"
  }
];

function buildQuiz() {
  const quizContainer = document.getElementById('quiz');
  const output = [];

  quizData.forEach((q, index) => {
    const answers = [];
    for (let letter in q.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${index}" value="${letter}">
          ${letter}: ${q.answers[letter]}
        </label><br>`
      );
    }

    output.push(
      `<div class="question"><strong>${q.question}</strong></div>
      <div class="answers">${answers.join('')}</div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answersContainers = document.querySelectorAll('.answers');
  let score = 0;

  quizData.forEach((q, i) => {
    const selector = `input[name=question${i}]:checked`;
    const answer = (document.querySelector(selector) || {}).value;
    if (answer === q.correctAnswer) {
      score++;
      answersContainers[i].style.color = 'green';
    } else {
      answersContainers[i].style.color = 'red';
    }
  });

  document.getElementById('results').innerHTML = `You got ${score} out of ${quizData.length} correct! 🥳`;
}

document.getElementById('submit').addEventListener('click', showResults);
buildQuiz();
