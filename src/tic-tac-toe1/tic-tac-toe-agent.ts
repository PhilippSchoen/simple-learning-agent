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
        for(let i = 0; i < game.gameLog.length; i++) {
            if(game.gameLog[i].move.symbol === this.symbol) {
                const turn = game.gameLog[i]
                if(this.history.get(turn.stateId) === undefined) {
                    this.history.set(turn.stateId, []);
                }
                let experience = this.history.get(turn.stateId).find((exp) => (exp.action.x === turn.move.x && exp.action.y === turn.move.y));
                if(!experience) {
                    experience = new Experience(turn.move, 0, 0);
                    this.history.get(turn.stateId).push(experience);
                }
                this.updateRating(experience, winner === this.symbol ? 3 : -3);
            }
        }
    }

    playTurn(state: TicTacToeState): TicTacToeMove {
        const curiosity = this.calculateCuriosity(state);
        const action = this.selectAction(state, curiosity);
        return action;
    }

    startGame(): void {
    }

    private updateRating(experience: Experience, rating: number) {
        experience.rating = (experience.rating * experience.confidence + rating) / (experience.confidence + 1);
        experience.confidence++;
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
        const actions = this.getAvailableActions(state);

        if(this.history.get(state.stateId) === undefined) {
            return actions[0];
        }

        if(curiosity > 1) {
            for(let action of actions) {
                if(!(this.history.get(state.stateId).find((exp) => (exp.action.x === action.x && exp.action.y === action.y)))) {
                    return action;
                }
            }
        }
        else if(curiosity > 0) {
            const leastExperience = this.history.get(state.stateId).find((exp) => exp.confidence < this.requiredConfidence);
            return leastExperience.action;
        }
        else {
            const highestRating = Math.max(...this.history.get(state.stateId).map(exp => exp.rating));
            const experience = this.history.get(state.stateId).find(item => item.rating === highestRating);
            return experience.action;
        }
        console.error("No action found!");
        return undefined;
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
        if(move.x < 0 || move.x >= state.board.length || move.y < 0 || move.y >= state.board[0].length) {
            return false;
        }
        return state.board[move.x][move.y] === Empty;
    }
}