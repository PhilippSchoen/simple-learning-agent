import {TicTacToePlayer} from "./tic-tac-toe-player";

export class TicTacToeState {

    constructor() {
        this.board = [
            [TicTacToePlayer.Empty, TicTacToePlayer.O, TicTacToePlayer.Empty],
            [TicTacToePlayer.Empty, TicTacToePlayer.Empty, TicTacToePlayer.Empty],
            [TicTacToePlayer.Empty, TicTacToePlayer.O, TicTacToePlayer.Empty]
        ];
    }

    board: TicTacToePlayer[][];
}