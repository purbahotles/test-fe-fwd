function changeBoardSize() {
  window.location.reload(); // Reload the page
}

document.addEventListener("DOMContentLoaded", function () {
  let boardSize = parseInt(document.getElementById("boardSizeID").value, 10);
  const board = document.getElementById("board");
  const cells = [];

  function initializeGame() {
    board.innerHTML = "";
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        cells.push(cell);
        board.appendChild(cell);
        cell.addEventListener("click", handleCellClick);
      }
    }

    // Update grid-template-columns based on the boardSize
    board.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
  }

  function handleCellClick(event) {
    const cell = event.target;
    if (cell.textContent !== "") return;

    const currentPlayer = getCurrentPlayer();
    cell.textContent = currentPlayer;

    if (checkForWinner()) {
      alert(`Player ${currentPlayer} wins!`);
      window.location.reload(); // Reload the page
      initializeGame();
      return;
    }

    if (checkForTie()) {
      alert("It's a tie!");
      initializeGame();
      return;
    }
  }

  function getCurrentPlayer() {
    const xCount = cells.filter(cell => cell.textContent === "X").length;
    const oCount = cells.filter(cell => cell.textContent === "O").length;
    return xCount <= oCount ? "X" : "O";
  }

  function checkForWinner() {
    // Check rows
    for (let i = 0; i < boardSize; i++) {
      if (
        cells[i * boardSize].textContent !== "" &&
        cells[i * boardSize].textContent === cells[i * boardSize + 1].textContent &&
        cells[i * boardSize + 1].textContent === cells[i * boardSize + 2].textContent
      ) {
        return true;
      }
    }
  
    // Check columns
    for (let i = 0; i < boardSize; i++) {
      if (
        cells[i].textContent !== "" &&
        cells[i].textContent === cells[i + boardSize].textContent &&
        cells[i + boardSize].textContent === cells[i + 2 * boardSize].textContent
      ) {
        return true;
      }
    }
  
    // Check diagonals
    if (
      cells[0].textContent !== "" &&
      cells[0].textContent === cells[4].textContent &&
      cells[4].textContent === cells[8].textContent
    ) {
      return true;
    }
  
    if (
      cells[2].textContent !== "" &&
      cells[2].textContent === cells[4].textContent &&
      cells[4].textContent === cells[6].textContent
    ) {
      return true;
    }
  
    return false;
  }
  

  function checkForTie() {
    return cells.every(cell => cell.textContent !== "");
  }
  

  initializeGame();
});
