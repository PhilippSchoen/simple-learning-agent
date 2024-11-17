import {TicTacToeAgent} from "./tic-tac-toe-agent";
import {TicTacToeEnemy} from "./tic-tac-toe-enemy";
import {TicTacToeState} from "./tic-tac-toe-state";

export class TicTacToeGame {

    constructor(private player: TicTacToeAgent, private enemy: TicTacToeEnemy) {
    }

    play() {
        let state = new TicTacToeState();
        while(state !== undefined) {
            state = this.playTurn(state);
        }
    }

    private playTurn(state: TicTacToeState): TicTacToeState {
        state = this.player.act(state);
        if(state.hasWon()) {
            this.enemy.turn = 0;
            return undefined;
        }
        state = this.enemy.act(state);
        if(state.hasWon()) {
            this.enemy.turn = 0;
            return undefined;
        }
        return state;
    }
}