let boxes = document.querySelectorAll(".box");
let newbtn = document.querySelector(".new");
let resetbtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

const winnerPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let turn0 = true;
let gameOver = false;
let moves = 0;

boxes.forEach((box, idx) => {
    box.addEventListener("click", () => {
        if (!gameOver) {
            box.classList.add("shake-box");
            if (turn0) {
                box.innerText = "X";
                turn0 = false;
            } else {
                box.innerText = "O";
                turn0 = true;
            }
            box.disabled = true;
            moves++;
            checkWinner();
        }
    });
});

const resetGame = () => {
    gameOver = false;
    turn0 = true;
    moves = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winning", "shake-box");
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner} !!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
};

const showDraw = () => {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
};

const checkWinner = () => {
    let won = false;
    winnerPattern.forEach((pattern) => {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
            won = true;
            showWinner(boxes[a].innerText);
            pattern.forEach((index) => boxes[index].classList.add("winning"));
        }
    });
    if (!won && moves === 9) {
        showDraw();
    }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
