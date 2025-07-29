const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timer");
const referenceTextDiv = document.getElementById("referenceText");
const inputField = document.getElementById("inputField");
const totalWordsDisplay = document.getElementById("totalWords");
const correctWordsDisplay = document.getElementById("correctWords");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const referenceParagraph = `Typing speed is a very important skill for students and professionals alike. It helps increase productivity and saves time.`;
let countdown = 60;
let timerInterval = null;

const initTest = () => {
  referenceTextDiv.textContent = referenceParagraph;
  inputField.value = "";
  inputField.disabled = false;
  inputField.focus();
  countdown = 60;
  updateTimerDisplay(countdown);
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
};

const updateTimerDisplay = (time) => {
  timerDisplay.textContent = `Time Left: ${time}s`;
};

const updateTimer = () => {
  countdown--;
  updateTimerDisplay(countdown);
  if (countdown === 0) {
    clearInterval(timerInterval);
    finishTest();
  }
};

const finishTest = () => {
  inputField.disabled = true;
  const typedText = inputField.value.trim();
  const typedWords = typedText.split(/\s+/);
  const referenceWords = referenceParagraph.split(" ");

  const correctWords = typedWords.filter(
    (word, i) => word === referenceWords[i]
  );

  const totalWords = typedWords.length;
  const correctCount = correctWords.length;
  const wpm = correctCount;
  const accuracy = totalWords ? ((correctCount / totalWords) * 100).toFixed(2) : 0;

  // Update UI
  totalWordsDisplay.textContent = totalWords;
  correctWordsDisplay.textContent = correctCount;
  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = `${accuracy}%`;
};

// Event Listeners
startBtn.addEventListener("click", () => {
  initTest();
});

