import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToePlayer} from "./tic-tac-toe-player";
import {TicTacToeMove} from "./tic-tac-toe-move";
import {TicTacToeService} from "./tic-tac-toe.service";

export class TicTacToeEnemy {

    turn = 0;

    constructor(private ticTacToeService: TicTacToeService) {
    }

    act(state: TicTacToeState): TicTacToeState {
        if(this.turn < state.board[0].length) {
            if(state.board[this.turn][2]  !== TicTacToePlayer.X) {
                const move = new TicTacToeMove(this.turn, 2, this.ticTacToeService, TicTacToePlayer.O);
                this.turn++;
                const output = move.execute(state);
                if(move.isWinningMove) {
                    this.turn = 0;
                }
                return output;
            }
        }
        this.turn++;
        return state;
    }
}