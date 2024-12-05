

export const getBishopMove = ({ positions, rank, file, ChessPiece }) => {
    const move = [];
    let x = rank;
    let y = file;

    while(--x >= 0 && --y >= 0) {
        if(positions[x][y] === '') {
            move.push([x , y]);
        } else if(checkEnemy(x , y , positions , ChessPiece)) {
            move.push([x , y]);
            break;
        } else if(checkTeamMate(x , y , positions , ChessPiece)) {
            break;
        }
    }

    x = rank;
    y = file;
    while(++x < 8 && ++y < 8) {
        if(positions[x][y] === '') {
            move.push([x , y]);
        } else if(checkEnemy(x , y , positions , ChessPiece)) {
            move.push([x , y]);
            break;
        } else if(checkTeamMate(x , y , positions , ChessPiece)) {
            break;
        }
    }

    x = rank;
    y = file;
    while(--x >= 0 && ++y < 8) {
        if(positions[x][y] === '') {
            move.push([x , y]);
        } else if(checkEnemy(x , y , positions , ChessPiece)) {
            move.push([x , y]);
            break;
        } else if(checkTeamMate(x , y , positions , ChessPiece)) {
            break;
        }
    }

    x = rank;
    y = file;
    while(++x < 8 && --y >= 0) {
        if(positions[x][y] === '') {
            move.push([x , y]);
        } else if(checkEnemy(x , y , positions , ChessPiece)) {
            move.push([x , y]);
            break;
        } else if(checkTeamMate(x , y , positions , ChessPiece)) {
            break;
        }
    }

    return move;
}

const checkTeamMate = ( x , y , positions , ChessPiece) =>(ChessPiece <= 5 && positions[x][y] <= 5) || (ChessPiece > 5 && positions[x][y] > 5);

const checkEnemy = ( x , y , positions , ChessPiece) => (ChessPiece <= 5 && positions[x][y] > 5) || (ChessPiece > 5 && positions[x][y] <= 5);