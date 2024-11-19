import {TicTacToeMove} from "./tic-tac-toe-move";

export class Experience {

    constructor(public action: TicTacToeMove, public rating: number, public confidence: number) {
    }

}