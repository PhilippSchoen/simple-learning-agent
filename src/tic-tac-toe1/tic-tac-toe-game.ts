import {TicTacToePlayer} from "./tic-tac-toe-player";
import {TicTacToeState} from "./tic-tac-toe-state";
import {Empty, TicTacToeSymbol} from "./tic-tac-toe-symbol";
import {TicTacToeMove} from "./entities/tic-tac-toe-move";

export class TicTacToeGame {

    playerTurns: Record<TicTacToeSymbol, number> = {
        [TicTacToeSymbol.X]: 0,
        [TicTacToeSymbol.O]: 0,
        [TicTacToeSymbol.Empty]: 0
    };
    gameLog: {stateId: string, move: TicTacToeMove}[] = [];

    constructor(private player1: TicTacToePlayer, private player2: TicTacToePlayer) {
    }

    play() {
        let state =  new TicTacToeState();
        let isGameOver = false;
        this.resetGame();
        this.player1.startGame();
        this.player2.startGame();

        while(!isGameOver) {
            this.playerTurns[this.player1.symbol]++;

            let move = this.player1.playTurn(state);
            this.gameLog.push({stateId: state.stateId, move});
            state = this.executeMove(state, move);

            this.printBoard(state);
            if(this.hasWon(state, this.player1.symbol)) {
                isGameOver = true;
                console.log("Player " + this.player1.symbol + " has won!");
                this.player1.endGame(this, this.player1.symbol);
                this.player2.endGame(this, this.player1.symbol);
                return;
            }

            this.playerTurns[this.player2.symbol]++;

            move = this.player2.playTurn(state);
            this.gameLog.push({stateId: state.stateId, move});
            state = this.executeMove(state, move);

            this.printBoard(state);
            if(this.hasWon(state, this.player2.symbol)) {
                isGameOver = true;
                console.log("Player " + this.player2.symbol + " has won!");
                this.player1.endGame(this, this.player2.symbol);
                this.player2.endGame(this, this.player2.symbol);
            }
        }
    }

    private executeMove(state: TicTacToeState, move: TicTacToeMove): TicTacToeState {
        const changedState = new TicTacToeState();
        changedState.board = {...state}.board;
        if(this.isValidMove(state, move)) {
            changedState.board[move.x][move.y] = move.symbol;
        }
        return changedState;
    }

    private isValidMove(state: TicTacToeState, move: TicTacToeMove): boolean {
        if(move.x < 0 || move.x >= state.board.length || move.y < 0 || move.y >= state.board[0].length) {
            return false;
        }
        return state.board[move.x][move.y] === Empty;
    }

    private hasWon(state: TicTacToeState, player: TicTacToeSymbol): boolean {
        const chainLength = this.calculateChainLength(state, player);
        return chainLength >= 3;
    }

    private printBoard(state: TicTacToeState) {
        console.log("Board: ");
        console.log(state.board.map((row) => row.map((cell) => cell === Empty ? " " : cell).join(" ")).join("\n"));
    }

    private resetGame() {
        this.gameLog = [];
        this.playerTurns = {
            [TicTacToeSymbol.X]: 0,
            [TicTacToeSymbol.O]: 0,
            [TicTacToeSymbol.Empty]: 0
        }
    }

    calculateChainLength(state: TicTacToeState, symbol: TicTacToeSymbol): number {
        let longestChain = 0;

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
            }
        }

        for (let i = 0; i < state.board.length; i++) {
            longestChain = Math.max(longestChain, this.calculateDiagonalLRFrom(state, symbol, i, 0));
            longestChain = Math.max(longestChain, this.calculateDiagonalRLFrom(state, symbol, i, state.board.length - 1));
        }
        for (let j = 1; j < state.board[0].length; j++) {
            longestChain = Math.max(longestChain, this.calculateDiagonalLRFrom(state, symbol, 0, j));
            longestChain = Math.max(longestChain, this.calculateDiagonalRLFrom(state, symbol, 0, j));
        }

        return longestChain;
    }

    private calculateDiagonalLRFrom(state: TicTacToeState, symbol: TicTacToeSymbol, startRow: number, startCol: number): number {
        let i = startRow;
        let j = startCol;
        let localChain = 0;
        let maxChain = 0;

        while (i < state.board.length && j < state.board[i].length) {
            if (state.board[i][j] === symbol) {
                localChain++;
                maxChain = Math.max(maxChain, localChain);
            } else {
                localChain = 0;
            }
            i++;
            j++;
        }

        return maxChain;
    }

    private calculateDiagonalRLFrom(state: TicTacToeState, symbol: TicTacToeSymbol, startRow: number, startCol: number): number {
        let i = startRow;
        let j = startCol;
        let localChain = 0;
        let maxChain = 0;

        while (i < state.board.length && j >= 0) {
            if (state.board[i][j] === symbol) {
                localChain++;
                maxChain = Math.max(maxChain, localChain);
            } else {
                localChain = 0;
            }
            i++;
            j--;
        }

        return maxChain;
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
}