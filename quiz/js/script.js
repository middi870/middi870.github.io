// Quiz state variables
let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;
let totalTime = 0;
let selectedCategory = "";
let selectedDifficulty = "easy";
let timePerQuestion = 15;
let userAnswers = [];
let quizStarted = false;

// DOM elements
const quizSelection = document.getElementById("quiz-selection");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const reviewScreen = document.getElementById("review-screen");
const quizCategory = document.getElementById("quiz-category");
const questionCounter = document.getElementById("question-counter");
const quizDifficulty = document.getElementById("quiz-difficulty");
const timerElement = document.getElementById("timer");
const timerContainer = document.getElementById("timer-container");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextQuestionBtn = document.getElementById("next-question");
const quitQuizBtn = document.getElementById("quit-quiz");
const resultsMessage = document.getElementById("results-message");
const correctAnswersElement = document.getElementById("correct-answers");
const wrongAnswersElement = document.getElementById("wrong-answers");
const timeSpentElement = document.getElementById("time-spent");
const reviewQuestionsContainer = document.getElementById(
  "review-questions-container"
);
const backToResultsBtn = document.getElementById("back-to-results");
const reviewAnswersBtn = document.getElementById("review-answers");
const newQuizBtn = document.getElementById("new-quiz");
const startQuizBtn = document.getElementById("start-quiz");
const difficultySelect = document.getElementById("difficulty");
const timeLimitSelect = document.getElementById("time-limit");
const quizOptions = document.querySelectorAll(".quiz-option");

// Event listeners
startQuizBtn.addEventListener("click", startQuiz);
nextQuestionBtn.addEventListener("click", showNextQuestion);
quitQuizBtn.addEventListener("click", quitQuiz);
reviewAnswersBtn.addEventListener("click", showReviewScreen);
backToResultsBtn.addEventListener("click", showResultsScreen);
newQuizBtn.addEventListener("click", resetQuiz);
difficultySelect.addEventListener("change", (e) => {
  selectedDifficulty = e.target.value;
});
timeLimitSelect.addEventListener("change", (e) => {
  timePerQuestion = parseInt(e.target.value);
});

quizOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Remove selected class from all options
    quizOptions.forEach((opt) =>
      opt.classList.remove("border-indigo-500", "ring-2", "ring-indigo-200")
    );

    // Add selected class to clicked option
    this.classList.add("border-indigo-500", "ring-2", "ring-indigo-200");
    selectedCategory = this.getAttribute("data-category");
  });
});

// Start the quiz
function startQuiz() {
  if (!selectedCategory) {
    alert("Please select a quiz category");
    return;
  }

  // Get quiz settings
  timePerQuestion = parseInt(timeLimitSelect.value);
  selectedDifficulty = difficultySelect.value;

  // Prepare quiz data
  currentQuiz = [...quizData[selectedCategory]];

  // Shuffle questions based on difficulty
  if (selectedDifficulty === "easy") {
    currentQuiz = currentQuiz.slice(0, 5); // Only first 5 questions
  } else if (selectedDifficulty === "medium") {
    currentQuiz = currentQuiz.slice(0, 8); // First 8 questions
  }
  // Hard difficulty keeps all questions

  // Shuffle the questions
  currentQuiz = shuffleArray(currentQuiz);

  // Reset quiz state
  currentQuestionIndex = 0;
  score = 0;
  totalTime = 0;
  userAnswers = [];
  quizStarted = true;

  // Update UI
  quizSelection.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  // Set category and difficulty display
  quizCategory.textContent = getCategoryName(selectedCategory);
  quizDifficulty.textContent = `${
    selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)
  } difficulty`;

  // Start the first question
  showQuestion();
}

// Display the current question
function showQuestion() {
  if (currentQuestionIndex >= currentQuiz.length) {
    showResults();
    return;
  }

  // Reset timer
  timeLeft = timePerQuestion;
  timerElement.textContent = timeLeft;
  timerElement.classList.remove("timer-low");

  // Update progress
  const progress = (currentQuestionIndex / currentQuiz.length) * 100;
  progressBar.style.width = `${progress}%`;

  // Update question counter
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${
    currentQuiz.length
  }`;

  // Get current question
  const question = currentQuiz[currentQuestionIndex];
  questionText.textContent = question.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Shuffle options
  const shuffledOptions = shuffleArray([...question.options]);

  // Create option buttons
  shuffledOptions.forEach((option, index) => {
    const optionElement = document.createElement("button");
    optionElement.className =
      "w-full text-left bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-4 transition-all duration-200";
    optionElement.textContent = option;
    optionElement.dataset.option = option;

    optionElement.addEventListener("click", () => selectOption(optionElement));

    optionsContainer.appendChild(optionElement);
  });

  // Reset next button
  nextQuestionBtn.disabled = true;

  // Start timer
  startTimer();
}

// Start the timer for the current question
function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    totalTime++;
    timerElement.textContent = timeLeft;

    // Change color when time is running low
    if (timeLeft <= 5) {
      timerElement.classList.add("timer-low");
    }

    // Time's up
    if (timeLeft <= 0) {
      clearInterval(timer);
      timeUp();
    }
  }, 1000);
}

// Handle time up
function timeUp() {
  // Mark all options as disabled
  const options = optionsContainer.querySelectorAll("button");
  options.forEach((option) => {
    option.disabled = true;
    option.classList.add("opacity-50");
  });

  // Find the correct answer
  const question = currentQuiz[currentQuestionIndex];
  const correctOption = optionsContainer.querySelector(
    `[data-option="${question.answer}"]`
  );

  // Highlight the correct answer
  if (correctOption) {
    correctOption.classList.add("option-correct");
  }

  // Record the user's answer (null for time up)
  userAnswers.push({
    question: question.question,
    userAnswer: null,
    correctAnswer: question.answer,
    explanation: question.explanation,
    isCorrect: false,
  });

  // Enable next button
  nextQuestionBtn.disabled = false;
}

// Handle option selection
function selectOption(selectedOption) {
  // Disable all options
  const options = optionsContainer.querySelectorAll("button");
  options.forEach((option) => {
    option.disabled = true;
    option.classList.add("opacity-50");
  });

  // Stop the timer
  clearInterval(timer);

  // Get the current question
  const question = currentQuiz[currentQuestionIndex];

  // Mark selected option
  selectedOption.classList.add("option-selected");

  // Find the correct answer
  const correctOption = optionsContainer.querySelector(
    `[data-option="${question.answer}"]`
  );

  // Check if answer is correct
  const isCorrect = selectedOption.dataset.option === question.answer;

  if (isCorrect) {
    selectedOption.classList.add("option-correct");
    score++;
  } else {
    selectedOption.classList.add("option-wrong");
    if (correctOption) {
      correctOption.classList.add("option-correct");
    }
  }

  // Record the user's answer
  userAnswers.push({
    question: question.question,
    userAnswer: selectedOption.dataset.option,
    correctAnswer: question.answer,
    explanation: question.explanation,
    isCorrect: isCorrect,
  });

  // Enable next button
  nextQuestionBtn.disabled = false;
}

// Show the next question
function showNextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

// Show quiz results
function showResults() {
  clearInterval(timer);

  // Calculate score percentage
  const percentage = Math.round((score / currentQuiz.length) * 100);

  // Set results message based on performance
  let message;
  if (percentage >= 80) {
    message = `Excellent! You scored ${percentage}%!`;
  } else if (percentage >= 60) {
    message = `Good job! You scored ${percentage}%.`;
  } else if (percentage >= 40) {
    message = `Not bad! You scored ${percentage}%.`;
  } else {
    message = `Keep practicing! You scored ${percentage}%.`;
  }

  resultsMessage.textContent = message;
  correctAnswersElement.textContent = score;
  wrongAnswersElement.textContent = currentQuiz.length - score;
  timeSpentElement.textContent = `${totalTime} seconds`;

  // Show results screen
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
}

// Show review screen with all questions and answers
function showReviewScreen() {
  reviewQuestionsContainer.innerHTML = "";

  userAnswers.forEach((answer, index) => {
    const questionElement = document.createElement("div");
    questionElement.className =
      "mb-8 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0";

    // Question
    const questionTitle = document.createElement("h3");
    questionTitle.className = "text-lg font-medium text-gray-800 mb-4";
    questionTitle.textContent = `${index + 1}. ${answer.question}`;
    questionElement.appendChild(questionTitle);

    // User answer
    const userAnswerDiv = document.createElement("div");
    userAnswerDiv.className = "mb-2";

    const userAnswerLabel = document.createElement("span");
    userAnswerLabel.className = "font-medium text-gray-700";
    userAnswerLabel.textContent = "Your answer: ";
    userAnswerDiv.appendChild(userAnswerLabel);

    const userAnswerText = document.createElement("span");
    userAnswerText.className = answer.isCorrect
      ? "text-green-600"
      : "text-red-600";
    userAnswerText.textContent = answer.userAnswer || "Time up!";
    userAnswerDiv.appendChild(userAnswerText);

    questionElement.appendChild(userAnswerDiv);

    // Correct answer
    const correctAnswerDiv = document.createElement("div");
    correctAnswerDiv.className = "mb-3";

    const correctAnswerLabel = document.createElement("span");
    correctAnswerLabel.className = "font-medium text-gray-700";
    correctAnswerLabel.textContent = "Correct answer: ";
    correctAnswerDiv.appendChild(correctAnswerLabel);

    const correctAnswerText = document.createElement("span");
    correctAnswerText.className = "text-green-600";
    correctAnswerText.textContent = answer.correctAnswer;
    correctAnswerDiv.appendChild(correctAnswerText);

    questionElement.appendChild(correctAnswerDiv);

    // Explanation
    if (answer.explanation) {
      const explanationDiv = document.createElement("div");
      explanationDiv.className = "bg-blue-50 rounded-lg p-4";

      const explanationLabel = document.createElement("div");
      explanationLabel.className = "font-medium text-blue-700 mb-1";
      explanationLabel.textContent = "Explanation:";
      explanationDiv.appendChild(explanationLabel);

      const explanationText = document.createElement("div");
      explanationText.className = "text-blue-600";
      explanationText.textContent = answer.explanation;
      explanationDiv.appendChild(explanationText);

      questionElement.appendChild(explanationDiv);
    }

    reviewQuestionsContainer.appendChild(questionElement);
  });

  resultsScreen.classList.add("hidden");
  reviewScreen.classList.remove("hidden");
}

// Go back to results screen from review
function showResultsScreen() {
  reviewScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
}

// Quit the quiz
function quitQuiz() {
  if (confirm("Are you sure you want to quit the quiz?")) {
    resetQuiz();
  }
}

// Reset the quiz to initial state
function resetQuiz() {
  clearInterval(timer);

  quizScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  reviewScreen.classList.add("hidden");
  quizSelection.classList.remove("hidden");

  // Reset quiz selection highlights
  quizOptions.forEach((opt) =>
    opt.classList.remove("border-indigo-500", "ring-2", "ring-indigo-200")
  );
  selectedCategory = "";
}

// Helper function to shuffle an array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Helper function to get category name
function getCategoryName(category) {
  const names = {
    general: "General Knowledge",
    science: "Science",
    history: "History",
    movies: "Movies",
  };
  return names[category] || category;
}
