

export const getKingMove = ({ positions, rank, file, ChessPiece, castleCase }) => {
    const move = [];
    let direction = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ]

    direction.forEach(dir => {
        const x = rank + dir[0];
        const y = file + dir[1];

        if (isValid(x, y, positions, ChessPiece)) {
            move.push([x, y]);
        }
    })

    const castleMove = getCastleMove({ positions, rank, file, ChessPiece, castleCase });
    // return move;
    return [...move, ...castleMove];
}


const isValid = (x, y, positions, ChessPiece) => (x >= 0 && x < 8 && y >= 0 && y < 8 && ((positions[x][y] === '') || (ChessPiece <= 5 && positions[x][y] > 5) || (ChessPiece > 5 && positions[x][y] <= 5)));


const ifCastleCaseValid = ({ ChessPiece, castleCase, dir }) => {
    const castleRookIndex = ChessPiece === 4 ? 0 : 1;
    return castleCase[castleRookIndex][dir];
}


const getCastleMove = ({ positions, rank, file, ChessPiece, castleCase }) => {
    const move = [];
    if (positions[rank][1] === '' && positions[rank][2] === '' && ifCastleCaseValid({ ChessPiece, castleCase, dir: 0 })) {
        move.push([rank, file - 2]);
    }
    if (positions[rank][4] === '' && positions[rank][5] === '' && positions[rank][6] === '' && ifCastleCaseValid({ ChessPiece, castleCase, dir: 1 })) {
        move.push([rank, file + 2]);
    }
    return move;
}