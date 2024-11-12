import {TicTacToePlayer} from "./tic-tac-toe-player";

export class TicTacToeState {

    constructor() {
        this.board = [
            [TicTacToePlayer.O, TicTacToePlayer.Empty, TicTacToePlayer.Empty],
            [TicTacToePlayer.Empty, TicTacToePlayer.O, TicTacToePlayer.O],
            [TicTacToePlayer.Empty, TicTacToePlayer.Empty, TicTacToePlayer.Empty]
        ];
    }

    board: TicTacToePlayer[][];

    get stateId(): string {
        return this.board.map((row) => row.map((cell) => cell === TicTacToePlayer.Empty ? " " : cell).join(" ")).join("\n");
    }
}