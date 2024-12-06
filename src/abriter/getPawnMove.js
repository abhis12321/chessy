
export const getPawnMove = ({ positions, rank, file, ChessPiece, prevPositions }) => {
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
    if (isCaptureValid(x, y, positions, ChessPiece)) {
        move.push([x, y]);
    }

    // Capture-right
    y = file + 1;
    if (isCaptureValid(x, y, positions, ChessPiece)) {
        move.push([x, y]);
    }

    const enpassant = getEnPassant({ positions, prevPositions, rank, file, ChessPiece });
    const allMove = [...move, ...enpassant];
    return allMove;
}

const isForwardValid = (x, y, positions) => (x >= 0 && y >= 0 && x < 8 && y < 8 && positions[x][y] == '');

const isCaptureValid = (x, y, positions, ChessPiece) => (x >= 0 && y >= 0 && x < 8 && y < 8 && positions[x][y] !== '' && ((positions[x][y] <= 5 && ChessPiece > 5) || (positions[x][y] > 5 && ChessPiece <= 5)));


export const getEnPassant = ({ positions, prevPositions, rank, file, ChessPiece }) => {
    const enemy = ChessPiece === 5 ? 11 : 5;
    const dir = ChessPiece === 5 ? 1 : -1;
    const allDir = [file - 1, file + 1];
    const move = [];
    allDir.forEach(f => {
        if (prevPositions && positions[rank][f] === enemy && positions[rank + 2 * dir][f] === '' && prevPositions[rank][f] === '' && prevPositions[rank + 2 * dir][f] === enemy) {
            move.push([rank + dir, f]);
        }
    })
    return move;
}


export const checkIfEnPassant = ({ positions, prevPositions, rank, file, ChessPiece, targetRank, targetFile, nvPositions }) => {
    if (ChessPiece % 6 != 5 || Math.abs(targetFile - file) !== 1 && Math.abs(targetRank - rank) !== 1) {
        return false;
    }

    const enemy = ChessPiece === 5 ? 11 : 5;
    const dir = ChessPiece === 5 ? 1 : -1;
    if (prevPositions && targetRank === rank + dir && positions[rank][targetFile] === enemy && positions[rank + 2 * dir][targetFile] === '' && prevPositions[rank][targetFile] === '' && prevPositions[rank + 2 * dir][targetFile] === enemy) {
        nvPositions[rank][targetFile] = '';
        return true;
    }
    return false;
}