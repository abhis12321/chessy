import { getBishopMove } from "./getBishopMove"
import { getKingMove } from "./getKingMove"
import { getKnightMove } from "./getKnightMove"
import { getPawnMove } from "./getPawnMove"
import { getQueenMove } from "./getQueenMove"
import { getRookMove } from "./getRooKMove"

export const getMove = [getRookMove, getKnightMove, getBishopMove, getQueenMove, getKingMove, getPawnMove];


export const validateNormalMove = ({ activeMoves, targetRank, targetFile }) => {
    for (let i = 0; i < activeMoves?.length; i++) {
        const move = activeMoves[i];
        if (move[0] == targetRank && move[1] == targetFile) {
            return true;
        }
    };
    return false;
}