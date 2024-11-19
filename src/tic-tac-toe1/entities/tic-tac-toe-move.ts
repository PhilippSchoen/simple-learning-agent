import {TicTacToeSymbol} from "../tic-tac-toe-symbol";

export class TicTacToeMove {
    constructor(public x: number, public y: number, public symbol: TicTacToeSymbol) {
    }
}