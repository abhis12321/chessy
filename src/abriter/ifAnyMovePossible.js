import { getValidAllMoves } from "./validMoves";


const ifTurn = (turn, piece) => piece !== '' && ((turn === 'w' && piece <= 5) || (turn === 'b' && piece > 5));

export const ifAnyMovePossible = ({ positions, prevPositions, castleCase, turn }) => {
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            if (ifTurn(turn, positions[rank][file])) {
                const ChessPiece = positions[rank][file];
                const move = getValidAllMoves({ positions, rank, file, ChessPiece, prevPositions, castleCase });
                console.log({turn , positions , prevPositions , castleCase, move});
                if (move?.length > 0) {
                    return true;
                }
            }
        }
    }
    return false;
}
