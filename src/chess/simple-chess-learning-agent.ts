import {LearningAgent} from "../learning-agent";
import {ChessState} from "./chess-state";
import {ChessMove} from "./chess-move";

export class SimpleChessLearningAgent extends LearningAgent<ChessState, ChessMove>{

    reflexTable = new Map<ChessState, ChessMove[]>();

    rateAction(state: ChessState) {
    }

    selectAction(state: ChessState): ChessMove {

    }

    learn()
}