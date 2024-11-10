import {TicTacToeAgent} from "./tic-tac-toe/tic-tac-toe-agent";
import {TicTacToeState} from "./tic-tac-toe/tic-tac-toe-state";

const agent = new TicTacToeAgent();
let state = new TicTacToeState();
for(let i = 0; i < 1000; i++) {
    state = agent.act(state);
}

