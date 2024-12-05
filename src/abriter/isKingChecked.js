

export const isKingChecked = ({ positions, king }) => {
    const { rank, file } = getKingPosition({ positions, king });
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

const checkPawnCheck = ({ positions, rank, file }) => {
    const case_01 = isKnight(rank-2 , file-1 , positions);
    const case_02 = isKnight(rank-2 , file+1 , positions);
    const case_03 = isKnight(rank+2 , file-1 , positions);
    const case_04 = isKnight(rank+2 , file+1 , positions);
    const case_11 = isKnight(rank-1 , file-2 , positions);
    const case_12 = isKnight(rank+1 , file-2 , positions);
    const case_13 = isKnight(rank-1 , file+2 , positions);
    const case_14 = isKnight(rank+1 , file+2 , positions);

    if(case_01 || case_02 || case_03 || case_04 || case_11 || case_12 || case_12 || case_13 || case_14) {
        return true;
    }
}


const isKnight = (x, y , positions) => (x >= 0 && x < 8 && y >= 0 && y < 8 && positions[x][y] % 6 === 1);