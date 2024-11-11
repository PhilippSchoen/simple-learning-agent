import {LearningAgent} from "../learning-agent";
import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToeMove} from "./tic-tac-toe-move";
import {TicTacToePlayer} from "./tic-tac-toe-player";
import {TicTacToeService} from "./tic-tac-toe.service";

export class TicTacToeAgent extends LearningAgent<TicTacToeMove, TicTacToeState> {

    constructor(private ticTacToeService: TicTacToeService) {
        super();
    }

    experience: Map<string, {action: TicTacToeMove, rating: number, confidence: number}[]> = new Map<string, {action: TicTacToeMove, rating: number, confidence: number}[]>();

    private requiredConfidence = 2;

    calculateCuriosity(state: TicTacToeState): number {
        if(this.experience.get(state.stateId) === undefined)
            return 2;

        const actions = this.getAvailableActions(state);
        for(let action of actions) {
            if(!this.experience.get(state.stateId).find((exp) => exp.action === action)) {
                return 2;
            }
        }
        if(this.experience.get(state.stateId).find((exp) => exp.confidence < this.requiredConfidence)) {
            return 1;
        }
        return 0;
    }

    private isEmpty(state: TicTacToeState): boolean {
        for(let i = 0; i < state.board.length; i++) {
            for(let j = 0; j < state.board[i].length; j++) {
                if(state.board[i][j] !== TicTacToePlayer.Empty) {
                    return false;
                }
            }
        }
        return true
    }

    rateAction(history: Array<{input: TicTacToeState, action: TicTacToeMove, output: TicTacToeState}>, currentState: TicTacToeState): number {
        if(this.isEmpty(currentState)) {
            return 666;
        }

        if(history.length < 1)
            return 666;

        const previousPlayerChain = this.ticTacToeService.calculateChainLength(history[history.length - 1].input, TicTacToePlayer.X);
        const playerChain = this.ticTacToeService.calculateChainLength(currentState, TicTacToePlayer.X);
        const previousEnemyChain = this.ticTacToeService.calculateChainLength(history[history.length - 1].input, TicTacToePlayer.O);
        const enemyChain = this.ticTacToeService.calculateChainLength(currentState, TicTacToePlayer.O);
        console.log("Player chain: ", playerChain);
        console.log("Previous player chain: ", previousPlayerChain);

        if(playerChain >= 3) {
            console.log("Rating: Player has won!");
            return 5;
        }
        else if(enemyChain >= 3) {
            console.log("Rating: Enemy has won!");
            return -5;
        }

        let score = 0;
        if(playerChain > previousPlayerChain) {
            score += 2;
        }
        if(enemyChain > previousEnemyChain) {
            score -= 1;
        }
        console.log("Rating: ", score);
        return score;
    }

    learn(history: Array<{input: TicTacToeState, action: TicTacToeMove, output: TicTacToeState}>, rating: number) {
        if(history.length < 1)
            return;

        if(rating === 666)
            return;

        const previous = history[history.length - 1];
        let previousExperience = this.experience.get(previous.input.stateId);
        if(!previousExperience) {
            previousExperience = [];
        }

        const action = previousExperience?.find((exp) => (exp.action.x === previous.action.x && exp.action.y === previous.action.y));
        // If action not included in experience, add it
        if(!action) {
            console.log("Not included");
            previousExperience.push({action: previous.action, rating: rating, confidence: 1});
            this.experience.set(previous.input.stateId, previousExperience);
        }
        // If action is included in experience, update rating and confidence
        else {
            console.log("Included: ", action);
            action.rating = (action.rating * action.confidence + rating) / (action.confidence + 1);
            action.confidence++;
        }
    }

    selectAction(state: TicTacToeState, curiosity: number): TicTacToeMove {

        const actions = this.getAvailableActions(state);

        if(this.experience.get(state.stateId) === undefined) {
            return actions[0];
        }

        if(curiosity > 1) {
            for(let action of actions) {
                if(!this.experience.get(state.stateId).find((exp) => exp.action === action)) {
                    return action;
                }
            }
        }
        else if(curiosity > 0) {
            const leastExperience = this.experience.get(state.stateId).find((exp) => exp.confidence < this.requiredConfidence);
            return leastExperience.action;
        }
        else {
            const highestRating = Math.max(...this.experience.get(state.stateId).map(exp => exp.rating));
            const experience = this.experience.get(state.stateId).find(item => item.rating === highestRating);
            return experience.action;
        }
        return undefined;
    }

    private isValidMove(state: TicTacToeState, move: TicTacToeMove): boolean {
        return state.board[move.x][move.y] === TicTacToePlayer.Empty;
    }

    private getAvailableActions(state: TicTacToeState): TicTacToeMove[] {
        const actions: TicTacToeMove[] = [];
        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                const move = new TicTacToeMove(i, j, this.ticTacToeService);
                if(this.isValidMove(state, move)) {
                    actions.push(move);
                }
            }
        }
        return actions;
    }
    
}