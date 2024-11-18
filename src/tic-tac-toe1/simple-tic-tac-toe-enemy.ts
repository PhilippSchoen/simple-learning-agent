import {TicTacToePlayer} from "./tic-tac-toe-player";
import {TicTacToeSymbol} from "./tic-tac-toe-symbol";
import {TicTacToeState} from "./tic-tac-toe-state";

export class SimpleTicTacToeEnemy extends TicTacToePlayer {

    turnCount = 0;

    constructor(public symbol: TicTacToeSymbol) {
        super(symbol);
    }

    endGame(winner: TicTacToeSymbol) {
    }

    playTurn(state: TicTacToeState): TicTacToeState {
        let changedState = new TicTacToeState();
        changedState.board = state.board.map((row) => row.map((cell) => cell));
        if(this.turnCount < state.board[0].length) {
            if(state.board[1][this.turnCount] === TicTacToeSymbol.Empty) {
                changedState.board[1][this.turnCount] = this.symbol;
            }
        }

        this.turnCount++;

        return changedState;
    }

    startGame() {
        this.turnCount = 0;
    }
}