import {TicTacToeState} from "../tic-tac-toe-state";
import {Empty, O, X} from "../tic-tac-toe-symbol";

describe('TicTacToeState - stateId', () => {
    test('should generate a string of 9 "-" characters for an empty board', () => {
        const state = new TicTacToeState();
        expect(state.stateId).toEqual("---------");
    });

    test('should generate a string of Xs and Os for a filled board', () => {
        const state = new TicTacToeState();
        state.board = [
            [X, O, X],
            [O, O, Empty],
            [O, X, O],
        ];
        expect(state.stateId).toEqual("XOXOO-OXO");
    });
});
