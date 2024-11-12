import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToePlayer} from "./tic-tac-toe-player";
import {Action} from "../action";
import {TicTacToeService} from "./tic-tac-toe.service";

export class TicTacToeMove extends Action<TicTacToeState>{

    isWinningMove = false;

    constructor(public x: number, public y: number, private ticTacToeService: TicTacToeService) {
        super();
    }

    execute(input: TicTacToeState): TicTacToeState {
        const output = new TicTacToeState();
        output.board = input.board.map((row) => row.map((cell) => cell));
        output.board[this.x][this.y] = TicTacToePlayer.X;
        console.log("Board: ");
        console.log(output.board.map((row) => row.map((cell) => cell === TicTacToePlayer.Empty ? " " : cell).join(" ")).join("\n"));

        if(this.hasWon(output)) {
            this.isWinningMove = true;
            return new TicTacToeState();
        }

        return output;
    }

    hasWon(state: TicTacToeState): boolean {
        const playerChain = this.ticTacToeService.calculateChainLength(state, TicTacToePlayer.X);
        const enemyChain = this.ticTacToeService.calculateChainLength(state, TicTacToePlayer.O);
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