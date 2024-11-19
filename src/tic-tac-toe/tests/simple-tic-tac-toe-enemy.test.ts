import {SimpleTicTacToeEnemy} from "../simple-tic-tac-toe-enemy";
import {Empty, O, X} from "../tic-tac-toe-symbol";
import {TicTacToeState} from "../tic-tac-toe-state";
import {TicTacToeGame} from "../tic-tac-toe-game";

describe('SimpleTicTacToeEnemy', () => {
    test('Enemy should place a symbol depending on the turnCount', () => {
        const enemy = new SimpleTicTacToeEnemy(X);
        enemy.turnCount = 1;
        const state = new TicTacToeState();
        const move = enemy.playTurn(state);
        expect(move.x).toEqual(1);
        expect(move.y).toEqual(1);
    });

    test('Enemy should not place a symbol if the cell is already occupied', () => {
        const enemy = new SimpleTicTacToeEnemy(X);
        const state = new TicTacToeState();
        state.board[1][0] = O;
        const move = enemy.playTurn(state);
        expect(move).toEqual(undefined);
    });

    test('Enemy should not place a symbol if the turnCount is greater than the board size', () => {
        const enemy = new SimpleTicTacToeEnemy(X);
        enemy.turnCount = 3;
        const state = new TicTacToeState();
        const move = enemy.playTurn(state);
        expect(move).toEqual(undefined);
    });

    test('Enemy should restart when a new game starts', () => {
        const enemy = new SimpleTicTacToeEnemy(X);
        enemy.turnCount = 1;
        let state = new TicTacToeState();
        const game = new TicTacToeGame(enemy, enemy);
        let move = enemy.playTurn(state);
        enemy.endGame(game, O);
        enemy.startGame();
        expect(enemy.turnCount).toEqual(0);

        state = new TicTacToeState();
        move = enemy.playTurn(state);
        expect(move.x).toEqual(1);
        expect(move.y).toEqual(0);
    });
});

