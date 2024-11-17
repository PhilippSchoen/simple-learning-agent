import {TicTacToePlayer} from "./tic-tac-toe-player";
import {TicTacToeService} from "./tic-tac-toe.service";

export class TicTacToeState {

    constructor() {
        this.board = [
            [TicTacToePlayer.Empty, TicTacToePlayer.Empty, TicTacToePlayer.Empty],
            [TicTacToePlayer.Empty, TicTacToePlayer.Empty, TicTacToePlayer.Empty],
            [TicTacToePlayer.Empty, TicTacToePlayer.Empty, TicTacToePlayer.Empty]
        ];
    }

    board: TicTacToePlayer[][];

    get stateId(): string {
        return this.board.map((row) => row.map((cell) => cell === TicTacToePlayer.Empty ? " " : cell).join(" ")).join("\n");
    }

    hasWon(): boolean {
        const service = new TicTacToeService();
        const playerChain = service.calculateChainLength(this, TicTacToePlayer.X);
        const enemyChain = service.calculateChainLength(this, TicTacToePlayer.O);
        if(playerChain >= 3) {
            console.log("X has won!");
            return true;
        }
        else if(enemyChain >= 3) {
            console.log("O has won!");
            return true;
        }
        return false;
    }
}