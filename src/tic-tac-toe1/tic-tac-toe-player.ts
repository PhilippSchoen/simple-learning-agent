import {TicTacToeSymbol} from "./tic-tac-toe-symbol";
import {TicTacToeState} from "./tic-tac-toe-state";

export abstract class TicTacToePlayer {
    protected constructor(public symbol: TicTacToeSymbol) {
    }

    abstract startGame(): void;

    abstract playTurn(state: TicTacToeState): TicTacToeState;

    abstract endGame(winner: TicTacToeSymbol): void;
}