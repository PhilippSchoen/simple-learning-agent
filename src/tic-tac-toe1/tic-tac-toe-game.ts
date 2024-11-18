import {TicTacToePlayer} from "./tic-tac-toe-player";
import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToeService} from "../tic-tac-toe/tic-tac-toe.service";
import {Empty, TicTacToeSymbol} from "./tic-tac-toe-symbol";

export class TicTacToeGame {
    constructor(private player1: TicTacToePlayer, private player2: TicTacToePlayer) {
    }

    play() {
        let state =  new TicTacToeState();
        let isGameOver = false;
        this.player1.startGame();
        this.player2.startGame();

        while(!isGameOver) {
            state = this.player1.playTurn(state);
            this.printBoard(state);
            if(this.hasWon(state, this.player1.symbol)) {
                isGameOver = true;
                console.log("Player " + this.player1.symbol + " has won!");
                this.player1.endGame(this.player1.symbol);
                this.player2.endGame(this.player1.symbol);
                return;
            }
            state = this.player2.playTurn(state);
            this.printBoard(state);
            if(this.hasWon(state, this.player2.symbol)) {
                isGameOver = true;
                console.log("Player " + this.player2.symbol + " has won!");
                this.player1.endGame(this.player2.symbol);
                this.player2.endGame(this.player2.symbol);
            }
        }
    }

    private hasWon(state: TicTacToeState, player: TicTacToeSymbol): boolean {
        const chainLength = this.calculateChainLength(state, player);
        return chainLength >= 3;
    }

    private printBoard(state: TicTacToeState) {
        console.log("Board: ");
        console.log(state.board.map((row) => row.map((cell) => cell === Empty ? " " : cell).join(" ")).join("\n"));
    }

    calculateChainLength(state: TicTacToeState, symbol: TicTacToeSymbol): number {
        let longestChain = 0;

        let diagonalRL = 0;
        let diagonalLR = 0;

        for(let i = 0; i < state.board.length; i++) {
            let localChainX = 0;
            let localChainY = 0;
            for(let j = 0; j < state.board[i].length; j++) {

                localChainX = this.calculateHorizontalChainLength(state, symbol, i, j, localChainX);
                if(localChainX > longestChain) {
                    longestChain = localChainX;
                }

                localChainY = this.calculateVerticalChainLength(state, symbol, i, j, localChainY);
                if(localChainY > longestChain) {
                    longestChain = localChainY;
                }

                diagonalRL = this.calculateDiagonalLRChainLength(state, symbol, i, j, diagonalRL);
                if(diagonalRL > longestChain) {
                    longestChain = diagonalRL;
                }

                diagonalLR = this.calculateDiagonalRLChainLength(state, symbol, i, j, diagonalLR);
                if(diagonalLR > longestChain) {
                    longestChain = diagonalLR;
                }
            }
        }

        return longestChain;
    }

    private calculateHorizontalChainLength(state: TicTacToeState, symbol: TicTacToeSymbol, i: number, j: number, localChain: number) {
        if(state.board[i][j] === symbol) {
            localChain++;
        } else {
            localChain = 0;
        }
        return localChain;
    }

    private calculateVerticalChainLength(state: TicTacToeState, symbol: TicTacToeSymbol, i: number, j: number, localChain: number) {
        if(state.board[j][i] === symbol) {
            localChain++;
        } else {
            localChain = 0;
        }
        return localChain;
    }

    private calculateDiagonalLRChainLength(state: TicTacToeState, symbol: TicTacToeSymbol, i: number, j: number, localChain: number) {
        if(i == j) {
            if(state.board[i][j] === symbol) {
                localChain++;
            } else {
                localChain = 0;
            }
        }
        return localChain;
    }

    private calculateDiagonalRLChainLength(state: TicTacToeState, symbol: TicTacToeSymbol, i: number, j: number, localChain: number) {
        const mirroredI = state.board.length - 1 - i;
        if(mirroredI === j) {
            if(state.board[mirroredI][j] === symbol) {
                localChain++;
            } else {
                localChain = 0;
            }
        }
        return localChain;
    }
}