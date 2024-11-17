import {TicTacToeAgent} from "./tic-tac-toe/tic-tac-toe-agent";
import {TicTacToeState} from "./tic-tac-toe/tic-tac-toe-state";
import {TicTacToeService} from "./tic-tac-toe/tic-tac-toe.service";
import {TicTacToeEnemy} from "./tic-tac-toe/tic-tac-toe-enemy";
import {TicTacToeGame} from "./tic-tac-toe/tic-tac-toe-game";

const service = new TicTacToeService();
const agent = new TicTacToeAgent(service);
const enemy = new TicTacToeEnemy(service);
let state = new TicTacToeState();
for(let i = 0; i < 5; i++) {
    const game = new TicTacToeGame(agent, enemy);
    game.play();
}

