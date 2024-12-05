

export const isKingChecked = ({ positions, king }) => {
    const { rank, file } = getKingPosition({ positions, king });
    const isKnightCheck = checkKnightCheck({ positions, rank, file, knight: king === 4 ? 7 : 1 });
    const isPawnCheck = checkPawnCheck({ positions, rank, file, pawn: king === 4 ? 11 : 5 })
    const isRookCheck = checkRookCheck({ positions, rank, file, pawn: king === 4 ? 6 : 0 })

    // console.log({ isKnightCheck , isPawnCheck })

    return (isPawnCheck || isKnightCheck || isRookCheck)
}


const getKingPosition = ({ positions, king }) => {
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            if (positions[rank][file] === king) {
                return { rank, file };
            }
        }
    }
}

const checkKnightCheck = ({ positions, rank, file, knight }) => {
    const case_01 = isKnight(rank - 2, file - 1, positions, knight);
    const case_02 = isKnight(rank - 2, file + 1, positions, knight);
    const case_03 = isKnight(rank + 2, file - 1, positions, knight);
    const case_04 = isKnight(rank + 2, file + 1, positions, knight);
    const case_11 = isKnight(rank - 1, file - 2, positions, knight);
    const case_12 = isKnight(rank + 1, file - 2, positions, knight);
    const case_13 = isKnight(rank - 1, file + 2, positions, knight);
    const case_14 = isKnight(rank + 1, file + 2, positions, knight);

    return (case_01 || case_02 || case_03 || case_04 || case_11 || case_12 || case_12 || case_13 || case_14);
}


const isKnight = (x, y, positions, knight) => (x >= 0 && x < 8 && y >= 0 && y < 8 && positions[x][y] === knight);


const checkPawnCheck = ({ positions, rank, file, pawn }) => {
    const case_01 = isPawn(rank + (pawn === 5 ? -1 : 1), file - 1 , positions , pawn);
    const case_02 = isPawn(rank + (pawn === 5 ? -1 : 1), file + 1 , positions , pawn);
    return (case_01 || case_02);
}

const isPawn = (x, y, positions, pawn) => (x >= 0 && x < 8 && y >= 0 && y < 8 && positions[x][y] === pawn);



const checkRookCheck = ({ positions, rank, file, rook }) => {
    let i = rank;
    let j = file;

    while(--i >= 0) {
        if(positions[i][file] === rook) {
            return true;
        } else if(positions[i][file] !== '') {
            break;
        }
    }

    i = rank;
    while(++i >= 0) {
        if(positions[i][file] === rook) {
            return true;
        } else if(positions[i][file] !== '') {
            break;
        }
    }

    while(--j >= 0) {
        if(positions[rank][j] === rook) {
            return true;
        } else if(positions[rank][j] !== '') {
            break;
        }
    }

    j = file;
    while(++j >= 0) {
        if(positions[rank][j] === rook) {
            return true;
        } else if(positions[rank][j] !== '') {
            break;
        }
    }

    return false;
}
