document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 5; // 5x5 board
    const gameBoard = document.getElementById('gameBoard');
    let moveCount = 0;
    let secondsElapsed = 0;
    let timerInterval;
    // const lightClickSound = new Audio('https://commondatastorage.googleapis.com/codeskulptor-assets/week7-bounce.m4a');
    const lightClickSound = new Audio('https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
    const gameWinSound = new Audio('https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg');
    const addendumButton = document.getElementById('addendumButton');
    const addendumPopup = document.getElementById('addendumPopup');
    // const closePopupButton = document.getElementById('closePopup');

    // Initialize the game board
    function initGame() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            let light = document.createElement('div');
            light.classList.add('light');
            light.addEventListener('click', () => toggleLights(i, 1));
            gameBoard.appendChild(light);
        }
        randomizeBoard();
    }

    // Toggle light and adjacent
    function toggleLights(index, move) {
        const toggle = (idx) => {
            if (idx >= 0 && idx < boardSize * boardSize) {
                gameBoard.children[idx].classList.toggle('is-off');
            }
        };

        toggle(index); // Clicked light
        if (index % boardSize !== 0) toggle(index - 1); // Left
        if (index % boardSize !== boardSize - 1) toggle(index + 1); // Right
        if (index >= boardSize) toggle(index - boardSize); // Above
        if (index < boardSize * (boardSize - 1)) toggle(index + boardSize); // Below

        checkWin();

        if (move === 1) {
            updateMoveCount();
            lightClickSound.play(); // Play sound when a light is clicked
        }
    }

    // Check if all lights are off
    function checkWin() {
        const isWin = [...gameBoard.children].every(light => light.classList.contains('is-off'));
        if (isWin) {
            window.alert('You win!');
            gameWinSound.play(); // Play win sound
        }
    }

    // Randomize the board
    function randomizeBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            if (Math.random() < 0.5) toggleLights(i, 0);
        }
    }

    // Function to update the move count display
    function updateMoveCount() {
        moveCount++;
        document.getElementById('moves').textContent = moveCount;
    }
    
    // Function to start the timer
    function startTimer() {
        timerInterval = setInterval(() => {
            secondsElapsed++;
            document.getElementById('time').textContent = formatTime(secondsElapsed);
        }, 1000);
    }
    
    // Function to format the elapsed time into a mm:ss format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${pad(minutes)}:${pad(remainingSeconds)}`;
    }
    
    // Helper function for formatting time components
    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function clearAndInitializeBoard() {
        // Reference to the game board container
        const gameBoard = document.getElementById('gameBoard');
    
        // Remove all existing lights from the board
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
    
        // Reinitialize the game board with new lights
        initGame();
    }

    function resetTimer() {
        // Reset the timer
        clearInterval(timerInterval); // Stop the current timer
        secondsElapsed = 0; // Reset the elapsed seconds to 0
        document.getElementById('time').textContent = formatTime(secondsElapsed); // Update the timer display
    }

    function resetMoveCount() {
        // Reset the move count
        moveCount = 0;
        document.getElementById('moves').textContent = moveCount;
    }

    function resetGame() {
        resetMoveCount();   // Reset move count
        resetTimer();   // Reset timer
        clearAndInitializeBoard();  // Reset game board
        startTimer();   // Start timer
    }

    initGame();
    startTimer();

    document.getElementById('resetButton').addEventListener('click', resetGame);

    var x = document.lastModified;
    document.getElementById('lastModified').textContent = x;

    // Open the popup
    addendumButton.addEventListener('click', () => {
        addendumPopup.style.display = 'block';
        // Optionally display overlay
        document.querySelector('.addendum-overlay').style.display = 'block';
    });

    // Close the popup
    // closePopupButton.addEventListener('click', () => {
    //     addendumPopup.style.display = 'none';
    //     // Optionally hide overlay
    //     document.querySelector('.addendum-overlay').style.display = 'none';
    // });

    window.addEventListener('click', (event) => {
        if (!addendumPopup.contains(event.target) && event.target != addendumButton) {
            addendumPopup.style.display = 'none';
            // Hide overlay if you're using one
            document.querySelector('.addendum-overlay').style.display = 'none';
        }
    });
});

