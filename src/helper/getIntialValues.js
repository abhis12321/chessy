import { FaChessPawn, FaChessKing, FaChessQueen, FaChessKnight, FaChessBishop, FaChessRook } from 'react-icons/fa6';


export const getChar = (i) => String.fromCharCode(97 + i);


export const ranks = new Array(8).fill().map((_, index) => 8 - index);


export const files = new Array(8).fill().map((_, index) => getChar(index));


export const WR = <FaChessRook className="text-[calc(min(100vw,100vh)/14)] drop-shadow-[0_0_1px_black]" />
export const WKt = <FaChessKnight className="text-[calc(min(100vw,100vh)/14)] drop-shadow-[0_0_1px_black]" />
export const WB = <FaChessBishop className="text-[calc(min(100vw,100vh)/14)] drop-shadow-[0_0_1px_black]" />
export const WQ = <FaChessQueen className="text-[calc(min(100vw,100vh)/14)] drop-shadow-[0_0_1px_black]" />
export const WK = <FaChessKing className="text-[calc(min(100vw,100vh)/14)] drop-shadow-[0_0_1px_black]" />
export const WP = <FaChessPawn className="text-[calc(min(100vw,100vh)/14)] drop-shadow-[0_0_1px_black]" />

export const BR = <FaChessRook className="text-[calc(min(100vw,100vh)/14)]" />
export const BKt = <FaChessKnight className="text-[calc(min(100vw,100vh)/14)]" />
export const BB = <FaChessBishop className="text-[calc(min(100vw,100vh)/14)]" />
export const BQ = <FaChessQueen className="text-[calc(min(100vw,100vh)/14)]" />
export const BK = <FaChessKing className="text-[calc(min(100vw,100vh)/14)]" />
export const BP = <FaChessPawn className="text-[calc(min(100vw,100vh)/14)]" />

export const CPS = [WR, WKt, WB, WQ, WK, WP, BR, BKt, BB, BQ, BK, BP];

export const getInitalPositions = () => {
    let positions = new Array(8).fill('').map((x) => new Array(8).fill(''));
    for (let i = 0; i < 8; i++) {
        positions[1][i] = 5;
        positions[6][i] = 11;
    }
    positions[0][0] = 0;
    positions[0][7] = 0;

    positions[7][0] = 6;
    positions[7][7] = 6;

    positions[0][1] = 1;
    positions[0][6] = 1;

    positions[7][1] = 7;
    positions[7][6] = 7;

    positions[0][2] = 2;
    positions[0][5] = 2;

    positions[7][2] = 8;
    positions[7][5] = 8;

    positions[0][4] = 3;
    positions[7][4] = 9;

    positions[0][3] = 4;
    positions[7][3] = 10;
    
    return positions;
}



export const copyPostions = (positions) => {
    let newPositions = new Array(8).fill('').map((x) => new Array(8).fill(''));
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            newPositions[rank][file] = positions[rank][file];
        }
    }
    return newPositions;
}

const castleCase = new Array(2).fill('').map((_) => new Array(2).fill(true));

export const initialChessState = {
    positions: [getInitalPositions()],
    turn: 'w',
    castleCase,
}