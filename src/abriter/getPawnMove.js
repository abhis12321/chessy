
export const getPawnMove = ({ positions, rank, file, ChessPiece }) => {
    const move = [];
    // +1 Rank 
    let x = rank + (ChessPiece == 5 ? 1 : -1);
    let y = file;

    if (isForwardValid(x, y, positions)) {
        move.push([x, y]);
    }
    // +2 Rank
    x = rank + (ChessPiece == 5 ? 2 : -2)
    if (((ChessPiece === 5 && rank === 1) || (ChessPiece === 11 && rank === 6)) && isForwardValid(x, y, positions)) {
        move.push([x, y]);
    }

    // Capture-left
    x = rank + (ChessPiece == 5 ? 1 : -1);
    y = file - 1;
    if(isCaptureValid(x, y, positions , ChessPiece)) {
        move.push([x, y]);
    }

    // Capture-right
    y = file + 1;
    if(isCaptureValid(x, y, positions , ChessPiece)) {
        move.push([x, y]);
    }

    return move;
}

const isForwardValid = (x, y, positions) => (x >= 0 && y >= 0 && x < 8 && y < 8 && positions[x][y] == '');

const isCaptureValid = (x, y, positions, ChessPiece) => (x >= 0 && y >= 0 && x < 8 && y < 8 && positions[x][y] !== '' && ((positions[x][y] <= 5 && ChessPiece > 5) || (positions[x][y] > 5 && ChessPiece <= 5)))