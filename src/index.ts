import {TicTacToeAgent} from "./tic-tac-toe/tic-tac-toe-agent";
import {TicTacToeState} from "./tic-tac-toe/tic-tac-toe-state";
import {TicTacToeService} from "./tic-tac-toe/tic-tac-toe.service";

const service = new TicTacToeService();
const agent = new TicTacToeAgent(service);
let state = new TicTacToeState();
for(let i = 0; i < 201; i++) {
    state = agent.act(state);
}

