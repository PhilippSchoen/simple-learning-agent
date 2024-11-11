import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToePlayer} from "./tic-tac-toe-player";
import {Action} from "../action";

export class TicTacToeMove extends Action<TicTacToeState>{

    constructor(public x: number, public y: number) {
        super();
    }

    execute(input: TicTacToeState): TicTacToeState {
        console.log("Moving " + this.x + " " + this.y);
        input.board[this.x][this.y] = TicTacToePlayer.X;
        console.log("Board: ");
        console.log(input.board.map((row) => row.map((cell) => cell === TicTacToePlayer.Empty ? " " : cell).join(" ")).join("\n"));

        console.log("Player chain length from action: ", this.calculateChainLength(input, TicTacToePlayer.X));
        console.log("Enemy chain length from action: ", this.calculateChainLength(input, TicTacToePlayer.O));

        if(this.hasWon(input)) {
            return new TicTacToeState();
        }

        return input;
    }

    hasWon(state: TicTacToeState): boolean {
        const playerChain = this.calculateChainLength(state, TicTacToePlayer.X);
        const enemyChain = this.calculateChainLength(state, TicTacToePlayer.O);
        if(playerChain >= 3) {
            console.log("X has won!");
            return true;
        }
        else if(enemyChain >= 3) {
            console.log("O has won!");
            return true;
        }
        return false;
    }

    private calculateChainLength(state: TicTacToeState, player: TicTacToePlayer) {
        let longestChain = 0;

        let diagonalX = 0;
        let diagonalY = 0;

        for(let i = 0; i < state.board.length; i++) {
            let localChainX = 0;
            let localChainY = 0;
            for(let j = 0; j < state.board[i].length; j++) {
                // Check horizontal
                if(state.board[i][j] === player) {
                    localChainX++;
                }
                if(localChainX > longestChain) {
                    longestChain = localChainX;
                }

                // Check vertical
                if(state.board[j][i] === player) {
                    localChainY++;
                }
                if(localChainY > longestChain) {
                    longestChain = localChainY;
                }

                // Check diagonal
                if(i === j && state.board[i][j] === player) {
                    diagonalX++;
                }
                if(diagonalX > longestChain) {
                    longestChain = diagonalX;
                }

                const mirroredI = state.board.length - 1 - i;
                if(mirroredI === j && state.board[mirroredI][j] === player) {
                    diagonalY++;
                }
                if(diagonalY > longestChain) {
                    longestChain = diagonalY;
                }
            }
        }

        return longestChain;
    }
}