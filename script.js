const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "Leo Tolstoy", "Shakespeare", "Mark Twain"],
      answer: "Shakespeare",
    },
    {
      question: "What is the speed of light?",
      options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "600,000 km/s"],
      answer: "300,000 km/s",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
  ];
  
  let currentQuestionIndex = 0;
  let playerName = "";
  let score = 0;
  
  const questionElem = document.getElementById("question");
  const optionsSection = document.getElementById("options-section");
  const qrCodeDiv = document.getElementById("qr-code"); // For QR code generation
  const questionPlayerElem = document.getElementById("question-player");
  const optionsPlayerSection = document.getElementById("options-player");
  const feedbackElem = document.getElementById("feedback");
  const playerScreen = document.getElementById("player-screen");
  const answerSection = document.getElementById("answer-section");
  const scoreSection = document.getElementById("score-section");
  const scoreElem = document.getElementById("score");
  const congratulationsElem = document.getElementById("congratulations");
  
  // Load the current question and options on the host screen
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElem.textContent = currentQuestion.question;
  
    // Clear previous options
    optionsSection.innerHTML = "";
  
    currentQuestion.options.forEach((option) => {
      const optionElem = document.createElement("label");
      optionElem.classList.add("option");
      optionElem.innerHTML = `<input type="radio" name="options" value="${option}"> ${option}`;
      optionsSection.appendChild(optionElem);
    });
  
    generateQRCode(`https://your-game-url.com/?question=${currentQuestionIndex}`);
  }
  
  loadQuestion();
  
  // Generate QR code using the QRCode.js library
  function generateQRCode(text) {
    qrCodeDiv.innerHTML = ""; // Clear any existing QR code
    new QRCode(qrCodeDiv, {
      text: text,
      width: 128,
      height: 128,
    });
  }
  
  // Switch to player name entry screen
  function loadPlayerScreen() {
    hostScreen.style.display = "none";
    playerScreen.style.display = "block";
  }
  
  // Simulate QR code scanning and load the player name screen
  qrCodeDiv.addEventListener("click", function () {
    loadPlayerScreen();
  });
  
  // Form submission for player's name
  document.getElementById("name-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    playerName = document.getElementById("player-name").value;
    if (playerName) {
      // Hide name entry form and show question and options
      document.getElementById("name-form").style.display = "none";
      showPlayerQuestion();
    }
  });
  
  // Show question and options on the player side
  function showPlayerQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionPlayerElem.textContent = currentQuestion.question;
  
    // Clear previous options
    optionsPlayerSection.innerHTML = "";
  
    currentQuestion.options.forEach((option) => {
      const optionElem = document.createElement("label");
      optionElem.classList.add("option");
      optionElem.innerHTML = `<input type="radio" name="player-options" value="${option}"> ${option}`;
      optionsPlayerSection.appendChild(optionElem);
    });
  
    // Show the question and options
    answerSection.style.display = "block";
    feedbackElem.textContent = ""; // Clear previous feedback
  }
  
  // Form submission for player's answer
  document.getElementById("submit-answer").addEventListener("click", function () {
    const playerAnswer = document.querySelector(
      'input[name="player-options"]:checked'
    ).value;
  
    // Check the player's answer
    if (playerAnswer === questions[currentQuestionIndex].answer) {
      score++;
      feedbackElem.textContent = "Correct Answer!";
    } else {
      feedbackElem.textContent = "Wrong Answer!";
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(showPlayerQuestion, 2000); // Delay before showing the next question
    } else {
      showScore();
    }
  });
  
  // Display the final score to the player
  function showScore() {
    scoreElem.textContent = `${score}/${questions.length}`;
    answerSection.style.display = "none";
    scoreSection.style.display = "block";
    congratulationsElem.textContent = `Congratulations, ${playerName}! Your score is ${score}/${questions.length}.`;
  }
  