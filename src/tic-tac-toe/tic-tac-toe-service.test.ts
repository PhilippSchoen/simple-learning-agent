import {TicTacToeService} from "./tic-tac-toe.service";
import {TicTacToeState} from "./tic-tac-toe-state";
import {X, O, Empty} from "./tic-tac-toe-player";

test('calculate horizontal chain length X', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [X, X, X],
        [O, O, O],
        [O, X, Empty]
    ];
    const length = service.calculateChainLength(state, X);
    expect(length).toBe(3);
});

test('calculate horizontal chain length O', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [Empty, X, X],
        [O, O, O],
        [O, X, Empty]
    ];
    const length = service.calculateChainLength(state, O);
    expect(length).toBe(3);
});

test('calculate vertical chain length X', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [X, O, X],
        [X, O, O],
        [X, X, Empty]
    ];
    const length = service.calculateChainLength(state, X);
    expect(length).toBe(3);
});

test('calculate vertical chain length O', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [Empty, X, O],
        [O,X, O],
        [O, X, O]
    ];
    const length = service.calculateChainLength(state, O);
    expect(length).toBe(3);
});

test('calculate diagonal RL chain length X', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [X, O, X],
        [O, X, O],
        [X, X, Empty]
    ];
    const length = service.calculateChainLength(state, X);
    expect(length).toBe(3);
});

test('calculate diagonal RL chain length O', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [Empty, X, O],
        [O, O, X],
        [O, X, O]
    ];
    const length = service.calculateChainLength(state, O);
    expect(length).toBe(3);
});

test('calculate diagonal LR chain length X', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [X, O, X],
        [O, X, O],
        [Empty, X, X]
    ];
    const length = service.calculateChainLength(state, X);
    expect(length).toBe(3);
});

test('calculate diagonal LR chain length O', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [Empty, X, O],
        [O, O, X],
        [X, O, O]
    ];
    const length = service.calculateChainLength(state, O);
    expect(length).toBe(3);
});

test('Mixed board X', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [X, O, X],
        [X, X, X],
        [Empty, X, X]
    ];
    const length = service.calculateChainLength(state, X);
    expect(length).toBe(3);
});

test('Mixed board O', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [O, X, O],
        [O, O, O],
        [Empty, O, O]
    ];
    const length = service.calculateChainLength(state, O);
    expect(length).toBe(3);
});

test('Empty board', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [Empty, Empty, Empty],
        [Empty, Empty, Empty],
        [Empty, Empty, Empty]
    ];
    const length = service.calculateChainLength(state, X);
    expect(length).toBe(0);
});

test('Full board', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [O, O, O],
        [O, O, O],
        [O, O, O]
    ];
    const length = service.calculateChainLength(state, O);
    expect(length).toBe(3);
});


test('Chain Length 2', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [X, O, X],
        [X, O, X],
        [O, X, O]
    ];
    const length = service.calculateChainLength(state, X);
    expect(length).toBe(2);
});

test('Chain Length 1', () => {
    const service = new TicTacToeService();
    const state = new TicTacToeState();
    state.board = [
        [X, O, X],
        [Empty, Empty, Empty],
        [O, X, O]
    ];
    const length = service.calculateChainLength(state, O);
    expect(length).toBe(1);
});


