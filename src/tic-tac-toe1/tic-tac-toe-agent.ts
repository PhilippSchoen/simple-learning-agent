import {TicTacToePlayer} from "./tic-tac-toe-player";
import {Empty, TicTacToeSymbol} from "./tic-tac-toe-symbol";
import {TicTacToeState} from "./tic-tac-toe-state";
import {Experience} from "./entities/experience";
import {TicTacToeMove} from "./entities/tic-tac-toe-move";
import {TicTacToeGame} from "./tic-tac-toe-game";

export class TicTacToeAgent extends TicTacToePlayer {

    constructor(public symbol: TicTacToeSymbol) {
        super(symbol);
    }

    history: Map<string, Experience[]> = new Map<string, Experience[]>();

    private requiredConfidence = 2;

    endGame(game:TicTacToeGame, winner:TicTacToeSymbol): void {
        for(let i = 0; i < game.playerTurns[this.symbol]; i++) {
            const experience = this.history.get(game.)
        }
    }

    playTurn(state: TicTacToeState): TicTacToeMove {
        const curiosity = this.calculateCuriosity(state);
        const action = this.selectAction(state, curiosity);
        return action;
    }

    startGame(): void {
    }

    private calculateCuriosity(state: TicTacToeState): number {
        if(this.history.get(state.stateId) === undefined) {
            return 2;
        }

        const actions = this.getAvailableActions(state);
        for(let action of actions) {
            if(!this.history.get(state.stateId).find((exp) => (exp.action.x === action.x && exp.action.y === action.y))) {
                return 2;
            }
        }

        if(this.history.get(state.stateId).find((exp) => exp.confidence < this.requiredConfidence)) {
            return 1;
        }
        return 0;
    }

    private selectAction(state: TicTacToeState, curiosity: number): TicTacToeMove {

    }

    private learn() {

    }

    private getAvailableActions(state: TicTacToeState): TicTacToeMove[] {
        const actions: TicTacToeMove[] = [];
        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                const move = new TicTacToeMove(i, j, this.symbol);
                if(this.isValidMove(state, move)) {
                    actions.push(move);
                }
            }
        }
        return actions;
    }

    private isValidMove(state: TicTacToeState, move: TicTacToeMove): boolean {
        return state.board[move.x][move.y] === Empty;
    }
}