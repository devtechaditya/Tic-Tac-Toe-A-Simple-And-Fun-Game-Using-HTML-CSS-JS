// ================== DOM ELEMENTS ==================
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset-btn");
const turnIndicator = document.getElementById("turn-indicator");
const scoreO = document.getElementById("score-o");
const scoreX = document.getElementById("score-x");
const themeBtn = document.getElementById("theme-btn");
const body = document.body;

// ================== GAME STATE ==================
let turnO = true; // true = O, false = X
let gameOver = false;
let scorePlayerO = 0;
let scorePlayerX = 0;

// ================== WIN PATTERNS ==================
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// ================== GAME LOGIC ==================
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || gameOver) return;
        if (turnO) {
            box.innerText = "O";
            turnIndicator.innerText = "Player X's Turn";
        } else {
            box.innerText = "X";
            turnIndicator.innerText = "Player O's Turn";
        }
        box.disabled = true;
        turnO = !turnO;
        checkWinner();
    });
});

// ================== CHECK WINNER ==================
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const val1 = boxes[a].innerText;
        const val2 = boxes[b].innerText;
        const val3 = boxes[c].innerText;
        if (val1 && val1 === val2 && val2 === val3) {
            gameOver = true;
            handleWin(pattern, val1);
            return;
        }
    }
    // Draw check
    const isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw) {
        gameOver = true;
        turnIndicator.innerText = "It's a Draw!";
    }
}

// ================== HANDLE WIN ==================
function handleWin(pattern, winner) {
    pattern.forEach(index => {
        boxes[index].classList.add("win");
    });
    turnIndicator.innerText = `Player ${winner} Wins! 🎉`;
    if (winner === "O") {
        scorePlayerO++;
        scoreO.innerText = scorePlayerO;
    } else {
        scorePlayerX++;
        scoreX.innerText = scorePlayerX;
    }
    disableAllBoxes();
}

// ================== UTILITIES ==================
function disableAllBoxes() {
    boxes.forEach(box => box.disabled = true);
}

// ================== RESET GAME ==================
resetBtn.addEventListener("click", resetGame);
function resetGame() {
    turnO = true;
    gameOver = false;
    turnIndicator.innerText = "Player O's Turn";
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("win");
    });
}

// ================== THEME SWITCHER ==================
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeBtn.innerText = "☀️ Light Mode";
}

themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
        themeBtn.innerText = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.innerText = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});