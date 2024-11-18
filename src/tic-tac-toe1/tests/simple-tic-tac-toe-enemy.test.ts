import {SimpleTicTacToeEnemy} from "../simple-tic-tac-toe-enemy";
import {Empty, O, X} from "../tic-tac-toe-symbol";
import {TicTacToeState} from "../tic-tac-toe-state";

describe('SimpleTicTacToeEnemy', () => {
    test('Enemy should place a symbol depending on the turnCount', () => {
        const enemy = new SimpleTicTacToeEnemy(X);
        enemy.turnCount = 1;
        let state = new TicTacToeState();
        state = enemy.playTurn(state);
        expect(state.board[1][1]).toEqual(X);
    });

    test('Enemy should not place a symbol if the cell is already occupied', () => {
        const enemy = new SimpleTicTacToeEnemy(X);
        let state = new TicTacToeState();
        state.board[1][0] = O;
        state = enemy.playTurn(state);
        expect(state.board[1][0]).toEqual(O);
    });

    test('Enemy should not place a symbol if the turnCount is greater than the board size', () => {
        const enemy = new SimpleTicTacToeEnemy(X);
        enemy.turnCount = 3;
        let state = new TicTacToeState();
        state = enemy.playTurn(state);
        expect(state.board).toEqual([[Empty, Empty, Empty], [Empty, Empty, Empty], [Empty, Empty, Empty]]);
    });

    test('Enemy should restart when a new game starts', () => {
        const enemy = new SimpleTicTacToeEnemy(X);
        enemy.turnCount = 1;
        let state = new TicTacToeState();
        state = enemy.playTurn(state);
        enemy.endGame(O);
        enemy.startGame();
        expect(enemy.turnCount).toEqual(0);

        state = new TicTacToeState();
        state = enemy.playTurn(state);
        expect(state.board[1][0]).toEqual(X);
    });
});

