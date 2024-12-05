

export const getKnightMove = ({ positions, rank, file, ChessPiece }) => {
    const move = [];
    // top-left
    let x = rank - 2;
    let y = file - 1;
    if (isInRange(x, y , positions , ChessPiece)) {
        move.push([x, y]);
    }
    // top-right
    y = file + 1;
    if (isInRange(x, y , positions , ChessPiece)) {
        move.push([x, y]);
    }
    // bottom-right
    x = rank + 2;
    if (isInRange(x, y , positions , ChessPiece)) {
        move.push([x, y]);
    }
    // bottom-left
    y = file - 1;
    if (isInRange(x, y , positions , ChessPiece)) {
        move.push([x, y]);
    }


    // left-top
    y = file - 2;
    x = rank - 1;
    if (isInRange(x, y , positions , ChessPiece)) {
        move.push([x, y]);
    }
    // left-bottom
    x = rank + 1;
    if (isInRange(x, y , positions , ChessPiece)) {
        move.push([x, y]);
    }
    // right-bottom
    y = file + 2;
    if (isInRange(x, y , positions , ChessPiece)) {
        move.push([x, y]);
    }
    // right-top
    x = rank - 1
    if (isInRange(x, y , positions , ChessPiece)) {
        move.push([x, y]);
    }

    return move;
}


const isInRange = (x, y , positions , ChessPiece) => x >= 0 && x < 8 && y >= 0 && y < 8 && (positions[x][y] === "" || ((ChessPiece > 5 && positions[x][y] <= 5) || (ChessPiece <= 5 && positions[x][y] > 5)));