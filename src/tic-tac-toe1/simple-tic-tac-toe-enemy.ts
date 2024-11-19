import {TicTacToePlayer} from "./tic-tac-toe-player";
import {TicTacToeSymbol} from "./tic-tac-toe-symbol";
import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToeGame} from "./tic-tac-toe-game";
import {TicTacToeMove} from "./entities/tic-tac-toe-move";

export class SimpleTicTacToeEnemy extends TicTacToePlayer {

    turnCount = 0;

    constructor(public symbol: TicTacToeSymbol) {
        super(symbol);
    }

    endGame(game: TicTacToeGame, winner: TicTacToeSymbol) {
    }

    playTurn(state: TicTacToeState): TicTacToeMove {
        let move: TicTacToeMove;
        if(this.turnCount < state.board[0].length) {
            if(state.board[1][this.turnCount] === TicTacToeSymbol.Empty) {
                move = new TicTacToeMove(1, this.turnCount, this.symbol);
            }
        }

        this.turnCount++;

        return move;
    }

    startGame() {
        this.turnCount = 0;
    }
}