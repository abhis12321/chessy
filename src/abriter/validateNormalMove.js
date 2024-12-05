import { getBishopMove } from "./getBishopMove"
import { getKingMove } from "./getKingMove"
import { getKnightMove } from "./getKnightMove"
import { getPawnMove } from "./getPawnMove"
import { getQueenMove } from "./getQueenMove"
import { getRookMove } from "./getRootMove"

const getMove = [getRookMove, getKnightMove, getBishopMove, getQueenMove, getKingMove, getPawnMove];


export const validateNormalMove = ({ positions, rank, file, ChessPiece, targetRank, targetFile }) => {
    const allMoves = getMove[ChessPiece % 6]({ positions, rank, file, ChessPiece });
    for(let i = 0; i < allMoves?.length; i++) {
        const move = allMoves[i];
        if(move[0] == targetRank && move[1] == targetFile) {
            return true;
        }
    };
    return false;
}