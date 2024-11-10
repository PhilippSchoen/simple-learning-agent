import {LearningAgent} from "../learning-agent";
import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToeMove} from "./tic-tac-toe-move";
import {TicTacToePlayer} from "./tic-tac-toe-player";

export class TicTacToeAgent extends LearningAgent<TicTacToeState, TicTacToeMove> {

    experience: Map<TicTacToeState, {action: TicTacToeMove, rating: number, confidence: number}[]> = new Map<TicTacToeState, {action: TicTacToeMove, rating: number, confidence: number}[]>();

    calculateCuriosity(state: TicTacToeState): number {
        const actions = this.getAvailableActions(state);
        // If missing move in experience, return 2
        // If moves in experience have less than 5 experience each, return 1
        // Else, return 0
        return 0;
    }

    rateAction(history: Array<{input: TicTacToeState, action: TicTacToeMove, output: TicTacToeState}>, currentState: TicTacToeState): number {
        const previousPlayerChain = this.calculateChainLength(history[history.length - 1].input, TicTacToePlayer.X);
        const playerChain = this.calculateChainLength(currentState, TicTacToePlayer.X);
        const previousEnemyChain = this.calculateChainLength(history[history.length - 1].input, TicTacToePlayer.O);
        const enemyChain = this.calculateChainLength(currentState, TicTacToePlayer.O);

        if(playerChain >= 3) {
            return 5;
        }
        else if(enemyChain >= 3) {
            return -5;
        }

        let score = 0;
        if(playerChain > previousPlayerChain) {
            score += 2;
        }
        if(enemyChain > previousEnemyChain) {
            score -= 1;
        }
        return score;
    }

    learn(history: Array<{input: TicTacToeState, action: TicTacToeMove, output: TicTacToeState}>, rating: number) {
        if(history.length === 0) {
            return;
        }
        const previous = history[history.length - 1];
        let previousExperience = this.experience.get(previous.input);
        const action = previousExperience.find((exp) => exp.action === previous.action);
        // If action not included in experience, add it
        if(action) {
            previousExperience.push({action: previous.action, rating: rating, confidence: 1});
            this.experience.set(previous.input, previousExperience);
        }
        // If action is included in experience, update rating and confidence
        else {
            action.rating = (action.rating * action.confidence + rating) / (action.confidence + 1);
            action.confidence++;
        }
    }

    private calculateChainLength(state: TicTacToeState, player: TicTacToePlayer) {
        let longestChain = 0;

        let diagonalX = 0;
        let diagonalY = 0;

        for(let i = 0; i < state.board.length; i++) {
            let localChainX = 0;
            let localChainY = 0;
            for(let j = 0; j < state.board[i].length; j++) {
                // Check horizontal
                if(state.board[i][j] === player) {
                    localChainX++;
                }
                if(localChainX > longestChain) {
                    longestChain = localChainX;
                }

                // Check vertical
                if(state.board[j][i] === player) {
                    localChainY++;
                }
                if(localChainY > longestChain) {
                    longestChain = localChainY;
                }

                // Check diagonal
                if(i === j && state.board[i][j] === player) {
                    diagonalX++;
                }
                if(diagonalX > longestChain) {
                    longestChain = diagonalX;
                }

                const mirroredI = state.board.length - 1 - i;
                if(mirroredI === j && state.board[mirroredI][j] === player) {
                    diagonalY++;
                }
                if(diagonalY > longestChain) {
                    longestChain = diagonalY;
                }
            }
        }

        return longestChain;
    }

    selectAction(state: TicTacToeState, curiosity: number): TicTacToeMove {
        if(curiosity > 1) {
            // Return random unknown move
        }
        else if(curiosity > 0) {
            // Return move with least experience
        }
        else {
            // Return move with highest experience
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
                const move = {x: i, y: j};
                if(this.isValidMove(state, move)) {
                    actions.push(move);
                }
            }
        }
        return actions;
    }
    
}