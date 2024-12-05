export const getRookMove = ({ positions , rank, file , ChessPiece }) => {
    const move = [];
    let i = rank, j = file;
    while(--i >= 0) {
        if(positions[i][file] === '') {
            move.push([i , file]);
        } else if((positions[i][file] > 5 && ChessPiece > 5) || (positions[i][file] <= 5 && ChessPiece <= 5)) {
            break;
        } else if((positions[i][file] > 5 && ChessPiece <= 5) || (positions[i][file] <= 5 && ChessPiece > 5)) {
            move.push([i , file]);
            break;
        }
    }
    i = rank;
    while(++i < 8) {
        if(positions[i][file] === '') {
            move.push([i , file]);
        } else if((positions[i][file] > 5 && ChessPiece > 5) || (positions[i][file] <= 5 && ChessPiece <= 5)) {
            break;
        } else if((positions[i][file] > 5 && ChessPiece <= 5) || (positions[i][file] <= 5 && ChessPiece > 5)) {
            move.push([i , file]);
            break;
        }
    } 
    while(--j >= 0) {
        if(positions[rank][j] === '') {
            move.push([rank , j]);
        } else if((positions[rank][j] > 5 && ChessPiece > 5) || (positions[rank][j] <= 5 && ChessPiece <= 5)) {
            break;
        } else if((positions[rank][j] > 5 && ChessPiece <= 5) || (positions[rank][j] <= 5 && ChessPiece > 5)) {
            move.push([rank , j]);
            break;
        }
    }
    j = file;
    while(++j < 8) {
        if(positions[rank][j] === '') {
            move.push([rank , j]);
        } else if((positions[rank][j] > 5 && ChessPiece > 5) || (positions[rank][j] <= 5 && ChessPiece <= 5)) {
            break;
        } else if((positions[rank][j] > 5 && ChessPiece <= 5) || (positions[rank][j] <= 5 && ChessPiece > 5)) {
            move.push([rank , j]);
            break;
        }
    }
    return move;
}