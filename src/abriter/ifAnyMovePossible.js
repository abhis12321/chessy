import { getValidAllMoves } from "./validMoves";


const ifTurn = (turn, piece) => piece !== '' && ((turn === 'w' && piece <= 5) || (turn === 'b' && piece > 5));

export const ifAnyMovePossible = ({ positions, prevPositions, castleCase, turn }) => {
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            if (ifTurn(turn, positions[rank][file])) {
                const ChessPiece = positions[rank][file];
                const move = getValidAllMoves({ positions, rank, file, ChessPiece, prevPositions, castleCase });
                // console.log({turn , positions , prevPositions , castleCase, move});
                if (move?.length > 0) {
                    return true;
                }
            }
        }
    }
    return false;
}


export const insufficientMaterials = ({ positions }) => {
    const pieces = positions.reduce((acc, row) =>
        acc = [
            ...acc,
            ...row.filter(ChessPiece => ChessPiece !== ''),
        ]
        , []);

    if (pieces.length == 2) {
        return true;
    } else if (pieces.length === 3 && (pieces.some(ChessPiece => ChessPiece % 6 === 1 || ChessPiece % 6 == 2))) {
        return true;
    } else if (pieces.length === 4 && new Set(pieces).size === 4 && (pieces.every(ChessPiece => ChessPiece % 6 === 4 || ChessPiece % 6 == 2) && (findColor({ positions, ChessPiece: 2 }) === findColor({ positions, ChessPiece: 8 })))) {
        return true;
    } else {
        return false;
    }
}


const findColor = ({ positions, ChessPiece }) => {
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            if (positions[rank][file] === ChessPiece) {
                return (rank + file) % 2;
            }
        }
    }
    return true;
}