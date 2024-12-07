import { copyPostions } from "@/helper/getIntialValues"
import { getBishopMove } from "./getBishopMove"
import { getKingMove } from "./getKingMove"
import { getKnightMove } from "./getKnightMove"
import { getPawnMove } from "./getPawnMove"
import { getQueenMove } from "./getQueenMove"
import { getRookMove } from "./getRooKMove"
import { isKingChecked } from "./isKingChecked"

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


export const getValidAllMoves = ({ positions, rank, file, ChessPiece, prevPositions, castleCase }) => {
    const nvPositions = copyPostions(positions);
    const moves = getMove[ChessPiece % 6]({ positions, rank, file, ChessPiece, prevPositions, castleCase });
    const validMove = [];

    moves.forEach((move) => {
        const targetRank = move[0];
        const targetFile = move[1];        
        nvPositions[rank][file] = '';
        nvPositions[targetRank][targetFile] = ChessPiece;
        const king = ChessPiece <= 5 ? 4 : 10;
        if(!isKingChecked({ positions:nvPositions, king })) {
            validMove.push(move);
        }        
        nvPositions[rank][file] = positions[rank][file];
        nvPositions[targetRank][targetFile] = positions[targetRank][targetFile];
    })

    return validMove;
} 


