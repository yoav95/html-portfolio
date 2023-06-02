const boxes = document.querySelectorAll('.box');
const startNewGameBtn = document.getElementById('start-new-game');
const messageBox = document.getElementById('message');

class ticTacToe {
    constructor() {
        this.turn = 'X';
        this.boardState = [
            ['0','0','0'],
            ['0','0','0'],
            ['0','0','0']
        ];

        this.connectGame();
    }

    updateBoardState(boxLocation, turn) {
        const xCoor = Number(boxLocation[1]);
        const yCoor = Number(boxLocation[3]);
        if(this.boardState[yCoor][xCoor] !== '0') {
            alert('taken!')
            return false;
        }
        if(this.turn === 'X') {
            this.boardState[yCoor][xCoor] = 'X';
        } else {
            this.boardState[yCoor][xCoor] = 'O';
        }

        return true;
    }

    updateUi(e) {
        e.currentTarget.innerText = this.turn;
    }


    checkForWinner() { //this function should return the winner 'X' - user1, 'O' - user2 and '0' - for a tie
        for(let i = 0; i < 3; i++) {
            if(this.boardState[i][0] === this.boardState[i][1] && this.boardState[i][1] === this.boardState[i][2] && this.boardState[i][0] !== '0') {
                return this.boardState[i][0];
            }
        }

        for(let j = 0; j < 3; j++) {
            if(this.boardState[0][j] === this.boardState[1][j] && this.boardState[1][j] === this.boardState[2][j] && this.boardState[0][j] !== '0') {
                return this.boardState[0][j]
            }
        }

        if(this.boardState[0][0] === this.boardState[1][1] && this.boardState[1][1] === this.boardState[2][2] && this.boardState[0][0] !== '0') {
            return this.boardState[0][0]
        }

        if(this.boardState[2][0] === this.boardState[1][1] && this.boardState[1][1] === this.boardState[0][2] && this.boardState[2][0] !== '0') {
            return this.boardState[2][0]
        }

        // if every item of the board state is occupied then its a tie => return '0'
        let tie = true;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.boardState[i][j] === '0') {
                    tie = false;
                }
            }
        }
        if(tie) {
            return '0'
        } else {
            return false;
        }

    }

    showPopUp(winner) {
        const menu = document.querySelector('.menu');
        let str = '';
        menu.style.display = 'flex'
        if(winner === 'X') {
            str = `player 1 wins!`
        } else if (winner === 'O') {
            str = 'player 2 wins!';
        } else if(winner ==='0') {
            str = `nice game! it was a tie`;
        }
        menu.querySelector('h2').innerText = str;
    }

    connectGame() {
        startNewGameBtn.addEventListener('click', this.startNewGame.bind(this));
        boxes.forEach(box => {
            box.addEventListener('click', (e) => {
                const boxLocation = e.currentTarget.dataset.location;
                

                if(this.updateBoardState(boxLocation, this.turn)) {
                    this.updateUi(e);
                } else {
                    return;
                }

                const winner = this.checkForWinner() //function should check for winner and if someone wins decalre and end game
                if(winner) {
                    if(winner === '0') {
                        alert('tie')
                    } else if(winner) {
                        alert(`${winner} wins`)
                    }
                    this.showPopUp(winner);
                }
                if(this.turn === 'X') {
                    this.turn = 'O';
                } else {
                    this.turn = 'X';
                }

            });
            box.addEventListener('mouseover', (e) => {
                const coordinates = e.currentTarget.dataset.location;
                const xCoor = Number(coordinates[1]);
                const yCoor = Number(coordinates[3]);
                if(this.boardState[yCoor][xCoor] === '0') {
                    e.currentTarget.innerText = this.turn;
                } else {
                    return;
                }
            });

            box.addEventListener('mouseout', (e) => {
                const coordinates = e.currentTarget.dataset.location;
                const xCoor = Number(coordinates[1]);
                const yCoor = Number(coordinates[3]);
                if(this.boardState[yCoor][xCoor] === '0') {
                    e.currentTarget.innerText = '';
                } else {
                    return;
                }
            })
        })
    }

    cleanBoardState() {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                this.boardState[i][j] = '0';
            }
        }
    }

    cleanBoardUi() {
        boxes.forEach(box => {
            box.innerText = '';
        })
    }

    startNewGame() {
        this.cleanBoardState();
        this.cleanBoardUi(); // should clean the board in ui
        this.turn = 'X';
        document.querySelector('.menu').style.display = 'none';
    }

    startGame() {
        // alert(`${this.turn}'s turn`)
    }
}

const ticTacToeGame = new ticTacToe();
ticTacToeGame.startGame()