

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

        if (isValid(x, y, positions, ChessPiece) && ifNearEnemyKing({ x, y, positions, enemyKing: ChessPiece === 4 ? 10 : 4 })) {
            move.push([x, y]);
        }
    })

    const castleMove = getCastleMove({ positions, rank, file, ChessPiece, castleCase });
    // return move;
    return [...move, ...castleMove];
}


const isValid = (x, y, positions, ChessPiece) => (x >= 0 && x < 8 && y >= 0 && y < 8 && ((positions[x][y] === '') || (ChessPiece <= 5 && positions[x][y] > 5) || (ChessPiece > 5 && positions[x][y] <= 5)));

const ifNearEnemyKing = ({x, y, positions, enemyKing}) => {
    let dir = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ]

    for (let i = 0; i < 8; i++) {
        const envX = x + dir[i][0];
        const envY = y + dir[i][1];
        if (positions?.[envX]?.[envY] === enemyKing) {
            return false;
        }
    }

    return true;
}

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