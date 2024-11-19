import {TicTacToePlayer} from "../tic-tac-toe-player";
import {TicTacToeSymbol} from "../tic-tac-toe-symbol";
import {TicTacToeState} from "../tic-tac-toe-state";
import {TicTacToeGame} from "../tic-tac-toe-game";
import {TicTacToeMove} from "../entities/tic-tac-toe-move";

export class MockPlayer extends TicTacToePlayer {
    constructor(public symbol: TicTacToeSymbol, private playerId: 1 | 2) {
        super(symbol);
    }

    turnCount = 0;

    endGame(game: TicTacToeGame, winner: TicTacToeSymbol): void {
    }

    startGame(): void {
        this.turnCount = 0;
    }

    playTurn(state: TicTacToeState): TicTacToeMove {

        console.log("Turn count: ", this.turnCount);

        let move: TicTacToeMove;
        if(this.turnCount < state.board[0].length) {
            if(state.board[this.playerId][this.turnCount] === TicTacToeSymbol.Empty) {
                move = new TicTacToeMove(this.playerId, this.turnCount, this.symbol);
            }
        }

        this.turnCount++;

        return move;
    }
}