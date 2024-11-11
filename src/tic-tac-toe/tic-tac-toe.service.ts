import {TicTacToeState} from "./tic-tac-toe-state";
import {TicTacToePlayer} from "./tic-tac-toe-player";

export class TicTacToeService {
    calculateChainLength(state: TicTacToeState, player: TicTacToePlayer): number {
        let longestChain = 0;

        let diagonalRL = 0;
        let diagonalLR = 0;

        for(let i = 0; i < state.board.length; i++) {
            let localChainX = 0;
            let localChainY = 0;
            for(let j = 0; j < state.board[i].length; j++) {

                localChainX = this.calculateHorizontalChainLength(state, player, i, j, localChainX);
                if(localChainX > longestChain) {
                    longestChain = localChainX;
                }

                localChainY = this.calculateVerticalChainLength(state, player, i, j, localChainY);
                if(localChainY > longestChain) {
                    longestChain = localChainY;
                }

                diagonalRL = this.calculateDiagonalLRChainLength(state, player, i, j, diagonalRL);
                if(diagonalRL > longestChain) {
                    longestChain = diagonalRL;
                }

                diagonalLR = this.calculateDiagonalRLChainLength(state, player, i, j, diagonalLR);
                if(diagonalLR > longestChain) {
                    longestChain = diagonalLR;
                }
            }
        }

        return longestChain;
    }

    private calculateHorizontalChainLength(state: TicTacToeState, player: TicTacToePlayer, i: number, j: number, localChain: number) {
        if(state.board[i][j] === player) {
            localChain++;
        } else {
            localChain = 0;
        }
        return localChain;
    }

    private calculateVerticalChainLength(state: TicTacToeState, player: TicTacToePlayer, i: number, j: number, localChain: number) {
        if(state.board[j][i] === player) {
            localChain++;
        } else {
            localChain = 0;
        }
        return localChain;
    }

    private calculateDiagonalLRChainLength(state: TicTacToeState, player: TicTacToePlayer, i: number, j: number, localChain: number) {
        if(i == j) {
            if(state.board[i][j] === player) {
                localChain++;
            } else {
                localChain = 0;
            }
        }
        return localChain;
    }

    private calculateDiagonalRLChainLength(state: TicTacToeState, player: TicTacToePlayer, i: number, j: number, localChain: number) {
        const mirroredI = state.board.length - 1 - i;
        if(mirroredI === j) {
            if(state.board[mirroredI][j] === player) {
                localChain++;
            } else {
                localChain = 0;
            }
        }
        return localChain;
    }
}