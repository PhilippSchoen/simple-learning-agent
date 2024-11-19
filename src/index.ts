
import {SimpleTicTacToeEnemy} from "./tic-tac-toe/simple-tic-tac-toe-enemy";
import {TicTacToeSymbol} from "./tic-tac-toe/tic-tac-toe-symbol";
import {TicTacToeGame} from "./tic-tac-toe/tic-tac-toe-game";
import {TicTacToeAgent} from "./tic-tac-toe/tic-tac-toe-agent";

const player1 = new TicTacToeAgent(TicTacToeSymbol.X);
const player2 = new SimpleTicTacToeEnemy(TicTacToeSymbol.O);
const game = new TicTacToeGame(player2, player1);

for(let i = 0; i < 100; i++) {
    game.play();
}

