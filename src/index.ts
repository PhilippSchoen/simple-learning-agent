
import {SimpleTicTacToeEnemy} from "./tic-tac-toe/simple-tic-tac-toe-enemy";
import {TicTacToeSymbol} from "./tic-tac-toe/tic-tac-toe-symbol";
import {TicTacToeGame} from "./tic-tac-toe/tic-tac-toe-game";
import {TicTacToeAgent} from "./tic-tac-toe/tic-tac-toe-agent";

const player1 = new TicTacToeAgent(TicTacToeSymbol.X);
const player2 = new TicTacToeAgent(TicTacToeSymbol.O);
const game = new TicTacToeGame(player2, player1);

/** Change this if you want to train / play for a different amount of games */
const trainingCycles = 1000;

for(let i = 0; i < trainingCycles; i++) {
    game.play();
}

