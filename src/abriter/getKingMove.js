

export const getKingMove = ({ positions, rank, file, ChessPiece }) => {
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

    return move;
}


const isValid = (x, y, positions, ChessPiece) => (x >= 0 && x < 8 && y >= 0 && y < 8 && ((positions[x][y] === '') || (ChessPiece <= 5 && positions[x][y] > 5) || (ChessPiece > 5 && positions[x][y] <= 5)))