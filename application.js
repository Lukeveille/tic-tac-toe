document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is ready');
  
  var gameBoard = document.querySelector('.board'),
  turnHeader = document.querySelector('h1'),
  stopBtn = document.querySelector('#stop'),
  gameSquares,
  cells,
  player1 = {sym: 'X', num: 1},
  player2 = {sym: 'O', num: 2},
  player,
  turn,
  game;

  initialize();
  
  function initialize() {
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
    cells = [];
    player = player1;
    turn = true;
    game = true;
    turnHeader.innerHTML = 'Player ' + player.num + ' turn';
    createBoard(gameBoard);   
    gameSquares = document.querySelectorAll('.gameSquare');
    gameSquares.forEach(function(element) {
      element.addEventListener('click', gameSquareClicked);
    });
  }

  stopBtn.addEventListener('click', () => {
    initialize();
  })

  function gameSquareClicked() {
    if (this.innerHTML === '' && game) {
      this.innerHTML = player.sym;
      if (checkVictory()) {
        turnHeader.innerHTML = 'Player ' + player.num + ' wins!';
        game = false;
      } else if (checkDraw()) {
        turnHeader.innerHTML = 'Draw';
        game = false;
      } else {
        if (turn) {
          player = player2;
          turn = false;
        } else {
          player = player1;
          turn = true;
        }
        turnHeader.innerHTML = 'Player ' + player.num + ' turn';
      }
    } else {
      initialize();
    }
  }
  
  function createBoard(board) {
    for (var i = 0; i < 3; i++) {
      cells[i] = [];
      var row = document.createElement('div');
      row.setAttribute('class', 'row')
      for (var j = 0; j < 3; j++) {

        var cell = document.createElement('div');
        cell.setAttribute('class', 'gameSquare');
        cell.setAttribute('hidden', 0);
        cell.setAttribute('id', 'cell' + i + j);
        row.appendChild(cell);
        cells[i][j] = cell;

        if (i === 0 && j === 0) {
          cell.setAttribute('class', 'gameSquare top left')
        } else if (i === 0) {
          cell.setAttribute('class', 'gameSquare top')
        } else if (j === 0) {
          cell.setAttribute('class', 'gameSquare left')
        }
      }
      board.appendChild(row);
    }
  }

  function checkVictory() {
    for (let i = 0; i < 3; i++) {
      if ((cells[i][0].innerHTML === player.sym && cells[i][1].innerHTML === player.sym && cells[i][2].innerHTML === player.sym) ||
      (cells[0][i].innerHTML === player.sym && cells[1][i].innerHTML === player.sym && cells[2][i].innerHTML === player.sym) ||
      (cells[0][0].innerHTML === player.sym && cells[1][1].innerHTML === player.sym && cells[2][2].innerHTML === player.sym) ||
      (cells[0][2].innerHTML === player.sym && cells[1][1].innerHTML === player.sym && cells[2][0].innerHTML === player.sym)) {
        return true;
      }
    }
  }

  function checkDraw() {
    let count = 0;
    cells.map(row => {row.map(cell => {
      if (cell.innerHTML != '') {
        count += 1;
      }
    })})
    if (count === 9) {
      return true;
    }
  }
});