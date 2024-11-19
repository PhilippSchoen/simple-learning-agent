import {TicTacToeAgent} from "../tic-tac-toe-agent";
import {O, X} from "../tic-tac-toe-symbol";
import {Experience} from "../entities/experience";
import {TicTacToeGame} from "../tic-tac-toe-game";
import {TicTacToeState} from "../tic-tac-toe-state";

describe('TicTacToeAgent', () => {
    test('endGame should improve ratings if won', () => {
        const agent = new TicTacToeAgent(X);
        const exp1 = new Experience({x: 0, y: 0, symbol: X}, 1, 1);
        const exp2 = new Experience({x: 1, y: 0, symbol: X}, 1, 1);
        const exp3 = new Experience({x: 2, y: 0, symbol: X}, 1, 1);
        agent.history.set('---------', [exp1]);
        agent.history.set('X--------', [exp2]);
        agent.history.set('XX-------', [exp3]);

        const game = new TicTacToeGame(undefined, undefined);
        game.gameLog = [
            {stateId: '---------', move: {x: 0, y: 0, symbol: X}},
            {stateId: 'X--------', move: {x: 1, y: 0, symbol: X}},
            {stateId: 'XX-------', move: {x: 2, y: 0, symbol: X}}
        ];

        agent.endGame(game, X);

        expect(agent.history.get('---------')[0].rating).toBe(2);
        expect(agent.history.get('X--------')[0].rating).toBe(2);
        expect(agent.history.get('XX-------')[0].rating).toBe(2);
        expect(agent.history.get('---------')[0].confidence).toBe(2);
        expect(agent.history.get('X--------')[0].confidence).toBe(2);
        expect(agent.history.get('XX-------')[0].confidence).toBe(2);
        expect(agent.history.get('---------').length).toBe(1);
    });

    test('endGame should decrease ratings if lost', () => {
        const agent = new TicTacToeAgent(X);
        const exp1 = new Experience({x: 0, y: 0, symbol: X}, 1, 1);
        const exp2 = new Experience({x: 1, y: 0, symbol: X}, 1, 1);
        const exp3 = new Experience({x: 2, y: 0, symbol: X}, 1, 1);
        agent.history.set('---------', [exp1]);
        agent.history.set('X--------', [exp2]);
        agent.history.set('XX-------', [exp3]);

        const game = new TicTacToeGame(undefined, undefined);
        game.gameLog = [
            {stateId: '---------', move: {x: 0, y: 0, symbol: X}},
            {stateId: 'X--------', move: {x: 1, y: 0, symbol: X}},
            {stateId: 'XX-------', move: {x: 2, y: 0, symbol: X}}
        ];

        agent.endGame(game, O);

        expect(agent.history.get('---------')[0].rating).toBe(-1);
        expect(agent.history.get('X--------')[0].rating).toBe(-1);
        expect(agent.history.get('XX-------')[0].rating).toBe(-1);
        expect(agent.history.get('---------')[0].confidence).toBe(2);
        expect(agent.history.get('X--------')[0].confidence).toBe(2);
        expect(agent.history.get('XX-------')[0].confidence).toBe(2);
        expect(agent.history.get('---------').length).toBe(1);
    });

    test('endGame should add new experience if not yet existing', () => {
        const agent = new TicTacToeAgent(X);
        const exp1 = new Experience({x: 0, y: 0, symbol: X}, 1, 1);
        const exp2 = new Experience({x: 1, y: 0, symbol: X}, 1, 1);
        agent.history.set('---------', [exp1]);
        agent.history.set('X--------', [exp2]);

        const game = new TicTacToeGame(undefined, undefined);
        game.gameLog = [
            {stateId: '---------', move: {x: 0, y: 0, symbol: X}},
            {stateId: 'X--------', move: {x: 1, y: 0, symbol: X}},
            {stateId: 'XX-------', move: {x: 2, y: 0, symbol: X}}
        ];

        agent.endGame(game, X);

        expect(agent.history.get('---------')[0].rating).toBe(2);
        expect(agent.history.get('XX-------')[0].rating).toBe(3);
        expect(agent.history.get('---------')[0].confidence).toBe(2);
        expect(agent.history.get('XX-------')[0].confidence).toBe(1);
    });

    test('endGame should add new experience if history is empty', () => {
        const agent = new TicTacToeAgent(X);

        const game = new TicTacToeGame(undefined, undefined);
        game.gameLog = [
            {stateId: '---------', move: {x: 0, y: 0, symbol: X}},
            {stateId: 'X--------', move: {x: 1, y: 0, symbol: X}},
            {stateId: 'XX-------', move: {x: 2, y: 0, symbol: X}}
        ];

        agent.endGame(game, X);

        expect(agent.history.get('---------')[0].rating).toBe(3);
        expect(agent.history.get('X--------')[0].rating).toBe(3);
        expect(agent.history.get('XX-------')[0].rating).toBe(3);
        expect(agent.history.get('---------')[0].confidence).toBe(1);
        expect(agent.history.get('X--------')[0].confidence).toBe(1);
        expect(agent.history.get('XX-------')[0].confidence).toBe(1);
        expect(agent.history.get('---------').length).toBe(1);
    });

    test('playTurn should return a new move if not all are yet known', () => {
        const agent = new TicTacToeAgent(X);
        const exp1 = new Experience({x: 0, y: 0, symbol: X}, 1, 1);
        const exp2 = new Experience({x: 1, y: 0, symbol: X}, 1, 1);
        const exp3 = new Experience({x: 2, y: 0, symbol: X}, 1, 1);
        const exp4 = new Experience({x: 0, y: 1, symbol: X}, 1, 1);
        const exp5 = new Experience({x: 1, y: 1, symbol: X}, 1, 1);
        const exp6 = new Experience({x: 2, y: 1, symbol: X}, 1, 1);
        const exp7 = new Experience({x: 0, y: 2, symbol: X}, 1, 1);
        const exp9 = new Experience({x: 2, y: 2, symbol: X}, 1, 1);
        agent.history.set('---------', [exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp9]);

        const state = new TicTacToeState();
        const move = agent.playTurn(state);

        expect(move.x).toBe(1);
        expect(move.y).toBe(2);
        expect(move.symbol).toBe(X);
    });

    test('playTurn should return the least confident move if not yet fully trained', () => {
        const agent = new TicTacToeAgent(X);
        const exp1 = new Experience({x: 0, y: 0, symbol: X}, 1, 2);
        const exp2 = new Experience({x: 1, y: 0, symbol: X}, 1, 2);
        const exp3 = new Experience({x: 2, y: 0, symbol: X}, 1, 2);
        const exp4 = new Experience({x: 0, y: 1, symbol: X}, 1, 1);
        const exp5 = new Experience({x: 1, y: 1, symbol: X}, 1, 2);
        const exp6 = new Experience({x: 2, y: 1, symbol: X}, 1, 2);
        const exp7 = new Experience({x: 0, y: 2, symbol: X}, 1, 2);
        const exp8 = new Experience({x: 1, y: 2, symbol: X}, 1, 2);
        const exp9 = new Experience({x: 2, y: 2, symbol: X}, 1, 2);
        agent.history.set('---------', [exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, exp9]);

        const state = new TicTacToeState();
        const move = agent.playTurn(state);

        expect(move.x).toBe(0);
        expect(move.y).toBe(1);
        expect(move.symbol).toBe(X);
    });

    test('playTurn should return the best move if fully trained', () => {
        const agent = new TicTacToeAgent(X);
        const exp1 = new Experience({x: 0, y: 0, symbol: X}, 1.22, 4);
        const exp2 = new Experience({x: 1, y: 0, symbol: X}, -4, 2);
        const exp3 = new Experience({x: 2, y: 0, symbol: X}, 1, 2);
        const exp4 = new Experience({x: 0, y: 1, symbol: X}, 7.234, 5);
        const exp5 = new Experience({x: 1, y: 1, symbol: X}, 1, 2);
        const exp6 = new Experience({x: 2, y: 1, symbol: X}, 3.2, 2);
        const exp7 = new Experience({x: 0, y: 2, symbol: X}, 1, 2);
        const exp8 = new Experience({x: 1, y: 2, symbol: X}, 0, 3);
        const exp9 = new Experience({x: 2, y: 2, symbol: X}, 7, 8);
        agent.history.set('---------', [exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, exp9]);

        const state = new TicTacToeState();
        const move = agent.playTurn(state);

        expect(move.x).toBe(0);
        expect(move.y).toBe(1);
        expect(move.symbol).toBe(X);
    });
});