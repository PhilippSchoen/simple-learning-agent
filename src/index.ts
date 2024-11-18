
import {SimpleTicTacToeEnemy} from "./tic-tac-toe1/simple-tic-tac-toe-enemy";
import {TicTacToeSymbol} from "./tic-tac-toe1/tic-tac-toe-symbol";
import {TicTacToeGame} from "./tic-tac-toe1/tic-tac-toe-game";


for(let i = 0; i < 5; i++) {
    const player1 = new SimpleTicTacToeEnemy(TicTacToeSymbol.X);
    const player2 = new SimpleTicTacToeEnemy(TicTacToeSymbol.O);
    const game = new TicTacToeGame(player2, player1);
    game.play();
}

