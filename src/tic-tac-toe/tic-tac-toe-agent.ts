import {LearningAgent} from "../learning-agent";
import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToeMove} from "./tic-tac-toe-move";

export class TicTacToeAgent extends LearningAgent<TicTacToeState, TicTacToeMove> {

    experience: Map<TicTacToeState, number> = new Map<TicTacToeState, number>();

    calculateCuriosity(): number {
        return 0;
    }

    learn(history: Array<TicTacToeState>, rating: number) {
    }

    rateAction(history: Array<TicTacToeState>, currentState: TicTacToeState): number {
        return 0;
    }

    selectAction(state: TicTacToeState, curiosity: number): TicTacToeMove {
        return undefined;
    }
    
}