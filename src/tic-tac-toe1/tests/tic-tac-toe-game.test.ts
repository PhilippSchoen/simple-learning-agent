import {TicTacToeGame} from "../tic-tac-toe-game";
import {Empty, O, X} from "../tic-tac-toe-symbol";
import {MockPlayer} from "./mock-tic-tac-toe-player";
import {TicTacToePlayer} from "../tic-tac-toe-player";
import {TicTacToeState} from "../tic-tac-toe-state";

describe('TicTacToeGame', () => {
    test('play function should run a full game', () => {

        const mockPlayer1 = new MockPlayer(X, 1);
        const mockPlayer2 = new MockPlayer(O, 2);

        const startGameSpyP1 = jest.spyOn(mockPlayer1, 'startGame');
        const startGameSpyP2 = jest.spyOn(mockPlayer2, 'startGame');
        const playTurnSpyP1 = jest.spyOn(mockPlayer1, 'playTurn');
        const playTurnSpyP2 = jest.spyOn(mockPlayer2, 'playTurn');
        const endGameSpyP1 = jest.spyOn(mockPlayer1, 'endGame');
        const endGameSpyP2 = jest.spyOn(mockPlayer2, 'endGame');

        const game = new TicTacToeGame(mockPlayer1, mockPlayer2);
        expect(game.totalMatchTurns).toBe(0);
        expect(game.playerTurns.X).toBe(0);
        expect(game.playerTurns.O).toBe(0);

        game.play();

        expect(startGameSpyP1).toHaveBeenCalledTimes(1);
        expect(startGameSpyP2).toHaveBeenCalledTimes(1);
        expect(playTurnSpyP1).toHaveBeenCalledTimes(3);
        expect(playTurnSpyP2).toHaveBeenCalledTimes(2);
        expect(endGameSpyP1).toHaveBeenCalledWith(game, X);
        expect(endGameSpyP2).toHaveBeenCalledWith(game, X);

        expect(game.totalMatchTurns).toBe(5);
        expect(game.playerTurns.X).toBe(3);
        expect(game.playerTurns.O).toBe(2);
    });

    test('play function should work for a second game', () => {
        const mockPlayer1 = new MockPlayer(O, 1);
        const mockPlayer2 = new MockPlayer(X, 2);

        const game = new TicTacToeGame(mockPlayer1, mockPlayer2);
        game.play();

        const startGameSpyP1 = jest.spyOn(mockPlayer1, 'startGame');
        const startGameSpyP2 = jest.spyOn(mockPlayer2, 'startGame');
        const playTurnSpyP1 = jest.spyOn(mockPlayer1, 'playTurn');
        const playTurnSpyP2 = jest.spyOn(mockPlayer2, 'playTurn');
        const endGameSpyP1 = jest.spyOn(mockPlayer1, 'endGame');
        const endGameSpyP2 = jest.spyOn(mockPlayer2, 'endGame');

        expect(game.totalMatchTurns).toBe(5);
        expect(game.playerTurns.X).toBe(2);
        expect(game.playerTurns.O).toBe(3);

        game.play();

        expect(startGameSpyP1).toHaveBeenCalledTimes(1);
        expect(startGameSpyP2).toHaveBeenCalledTimes(1);
        expect(playTurnSpyP1).toHaveBeenCalledTimes(3);
        expect(playTurnSpyP2).toHaveBeenCalledTimes(2);
        expect(endGameSpyP1).toHaveBeenCalledWith(game, O);
        expect(endGameSpyP2).toHaveBeenCalledWith(game, O);

        expect(game.totalMatchTurns).toBe(5);
        expect(game.playerTurns.X).toBe(2);
        expect(game.playerTurns.O).toBe(3);
    });
});

describe('Calculate TicTacToe chain length', () => {

    test('calculate horizontal chain length X', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [X, X, X],
            [O, O, O],
            [O, X, Empty]
        ];
        const length = game.calculateChainLength(state, X);
        expect(length).toBe(3);
    });

    test('calculate horizontal chain length O', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [Empty, X, X],
            [O, O, O],
            [O, X, Empty]
        ];
        const length = game.calculateChainLength(state, O);
        expect(length).toBe(3);
    });

    test('calculate vertical chain length X', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [X, O, X],
            [X, O, O],
            [X, X, Empty]
        ];
        const length = game.calculateChainLength(state, X);
        expect(length).toBe(3);
    });

    test('calculate vertical chain length O', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [Empty, X, O],
            [O,X, O],
            [O, X, O]
        ];
        const length = game.calculateChainLength(state, O);
        expect(length).toBe(3);
    });

    test('calculate diagonal RL chain length X', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [X, O, X],
            [O, X, O],
            [X, X, Empty]
        ];
        const length = game.calculateChainLength(state, X);
        expect(length).toBe(3);
    });

    test('calculate diagonal RL chain length O', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [Empty, X, O],
            [O, O, X],
            [O, X, O]
        ];
        const length = game.calculateChainLength(state, O);
        expect(length).toBe(3);
    });

    test('calculate diagonal LR chain length X', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [X, O, X],
            [O, X, O],
            [Empty, X, X]
        ];
        const length = game.calculateChainLength(state, X);
        expect(length).toBe(3);
    });

    test('calculate diagonal LR chain length O', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [O, X, O],
            [O, O, X],
            [X, O, O]
        ];
        const length = game.calculateChainLength(state, O);
        expect(length).toBe(3);
    });

    test('calculate diagonal LR chain with length 2', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [X, X, O],
            [O, Empty, X],
            [X, O, X]
        ];
        const length = game.calculateChainLength(state, O);
        expect(length).toBe(2);
    });

    test('calculate diagonal RL chain with length 2', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [O, X, O],
            [X, Empty, O],
            [Empty, O, X]
        ];
        const length = game.calculateChainLength(state, X);
        expect(length).toBe(2);
    });

    test('Mixed board X', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [X, O, X],
            [X, X, X],
            [Empty, X, X]
        ];
        const length = game.calculateChainLength(state, X);
        expect(length).toBe(3);
    });

    test('Mixed board O', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [O, X, O],
            [O, O, O],
            [Empty, O, O]
        ];
        const length = game.calculateChainLength(state, O);
        expect(length).toBe(3);
    });

    test('Empty board', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [Empty, Empty, Empty],
            [Empty, Empty, Empty],
            [Empty, Empty, Empty]
        ];
        const length = game.calculateChainLength(state, X);
        expect(length).toBe(0);
    });

    test('Full board', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [O, O, O],
            [O, O, O],
            [O, O, O]
        ];
        const length = game.calculateChainLength(state, O);
        expect(length).toBe(3);
    });


    test('Chain Length 2', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [X, O, X],
            [X, O, X],
            [O, X, O]
        ];
        const length = game.calculateChainLength(state, X);
        expect(length).toBe(2);
    });

    test('Chain Length 1', () => {
        const player = undefined as TicTacToePlayer;
        const game = new TicTacToeGame(player, player);
        const state = new TicTacToeState();
        state.board = [
            [X, O, X],
            [Empty, Empty, Empty],
            [O, X, O]
        ];
        const length = game.calculateChainLength(state, O);
        expect(length).toBe(1);
    });
});

