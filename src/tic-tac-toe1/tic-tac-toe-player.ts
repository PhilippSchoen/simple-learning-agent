import {TicTacToeSymbol} from "./tic-tac-toe-symbol";
import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToeGame} from "./tic-tac-toe-game";
import {TicTacToeMove} from "./entities/tic-tac-toe-move";

export abstract class TicTacToePlayer {
    protected constructor(public symbol: TicTacToeSymbol) {
    }

    abstract startGame(): void;

    abstract playTurn(state: TicTacToeState): TicTacToeMove;

    abstract endGame(game: TicTacToeGame, winner: TicTacToeSymbol): void;
}