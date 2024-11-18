import {TicTacToePlayer} from "../tic-tac-toe-player";
import {TicTacToeSymbol} from "../tic-tac-toe-symbol";
import {TicTacToeState} from "../tic-tac-toe-state";

export class MockPlayer extends TicTacToePlayer {
    constructor(public symbol: TicTacToeSymbol, private playerId: 1 | 2) {
        super(symbol);
    }

    turnCount = 0;

    endGame(winner: TicTacToeSymbol): void {
    }

    startGame(): void {
        this.turnCount = 0;
    }

    playTurn(state: TicTacToeState): TicTacToeState {

        console.log("Turn count: ", this.turnCount);

        let changedState = new TicTacToeState();
        changedState.board = state.board.map((row) => row.map((cell) => cell));
        if(this.turnCount < state.board[0].length) {
            if(state.board[this.playerId][this.turnCount] === TicTacToeSymbol.Empty) {
                changedState.board[this.playerId][this.turnCount] = this.symbol;
            }
        }

        this.turnCount++;

        return changedState;
    }
}