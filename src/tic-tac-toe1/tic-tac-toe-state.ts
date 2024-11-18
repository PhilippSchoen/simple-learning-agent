import {TicTacToeSymbol} from "./tic-tac-toe-symbol";

export class TicTacToeState {

    constructor() {
        this.board = [
            [TicTacToeSymbol.Empty, TicTacToeSymbol.Empty, TicTacToeSymbol.Empty],
            [TicTacToeSymbol.Empty, TicTacToeSymbol.Empty, TicTacToeSymbol.Empty],
            [TicTacToeSymbol.Empty, TicTacToeSymbol.Empty, TicTacToeSymbol.Empty]
        ];
    }

    board: TicTacToeSymbol[][];

    get stateId(): string {
        return this.board.map((row) => row.map((cell) => cell === TicTacToeSymbol.Empty ? "-" : cell).join("")).join("");
    }
}