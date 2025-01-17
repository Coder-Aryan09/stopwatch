// script.js
let startTime, elapsedTime = 0, timerInterval;
const timeDisplay = document.querySelector('.time-display');
const lapTimesList = document.querySelector('.lap-times');
let isRunning = false; // Track stopwatch state (running or paused)

// Update the time display
function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Format time in HH:MM:SS.mmm
function formatTime(ms) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

// Start the stopwatch
function startStopwatch() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
  }
}

// Pause the stopwatch
function pauseStopwatch() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
  }
}

// Toggle Start/Pause with Spacebar
function toggleStartPause() {
  if (isRunning) {
    pauseStopwatch();
  } else {
    startStopwatch();
  }
}

// Reset the stopwatch
document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = "00:00:00.000";
  lapTimesList.innerHTML = '';
});

// Record a lap time
document.getElementById('lap-btn').addEventListener('click', () => {
  if (timerInterval) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapTimesList.appendChild(lapItem);
  }
});

// Add event listeners for buttons
document.getElementById('start-btn').addEventListener('click', startStopwatch);
document.getElementById('pause-btn').addEventListener('click', pauseStopwatch);

// Listen for Spacebar to toggle Start/Pause
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault(); // Prevent default spacebar behavior (e.g., page scroll)
    toggleStartPause();
  }
});
document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' ) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap: ${lapTime}`;
        lapTimesList.appendChild(lapItem);
    }
      });

      document.addEventListener('keydown', (event) => {
        if (event.code === 'ShiftLeft' ) {
            clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = "00:00:00.000";
  lapTimesList.innerHTML = '';
        }
          });

