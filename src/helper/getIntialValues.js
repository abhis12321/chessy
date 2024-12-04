import { FaChessPawn, FaChessKing, FaChessQueen, FaChessKnight, FaChessBishop, FaChessRook } from 'react-icons/fa6';


export const getChar = (i) => String.fromCharCode(97 + i);


export const ranks = new Array(8).fill().map((val, index) => 8 - index);


export const files = new Array(8).fill().map((val, index) => getChar(index));


export const WR = <FaChessRook className="text-[calc(min(100vw,100vh)/14)] text-white drop-shadow-[0_0_2px_black]" />
export const WKt = <FaChessKnight className="text-[calc(min(100vw,100vh)/14)] text-white drop-shadow-[0_0_2px_black]" />
export const WB = <FaChessBishop className="text-[calc(min(100vw,100vh)/14)] text-white drop-shadow-[0_0_2px_black]" />
export const WQ = <FaChessQueen className="text-[calc(min(100vw,100vh)/14)] text-white drop-shadow-[0_0_2px_black]" />
export const WK = <FaChessKing className="text-[calc(min(100vw,100vh)/14)] text-white drop-shadow-[0_0_2px_black]" />
export const WP = <FaChessPawn className="text-[calc(min(100vw,100vh)/14)] text-white drop-shadow-[0_0_2px_black]" />

export const BR = <FaChessRook className="text-[calc(min(100vw,100vh)/14)]" />
export const BKt = <FaChessKnight className="text-[calc(min(100vw,100vh)/14)]" />
export const BB = <FaChessBishop className="text-[calc(min(100vw,100vh)/14)]" />
export const BQ = <FaChessQueen className="text-[calc(min(100vw,100vh)/14)]" />
export const BK = <FaChessKing className="text-[calc(min(100vw,100vh)/14)]" />
export const BP = <FaChessPawn className="text-[calc(min(100vw,100vh)/14)]" />

export const getInitalPositions = () => {
    let positions = new Array(8).fill('').map((x) => new Array(8).fill(''));
    for (let i = 0; i < 8; i++) {
        positions[1][i] = WP;
        positions[6][i] = BP;
    }
    positions[0][0] = WR;
    positions[0][7] = WR;

    positions[7][0] = BR;
    positions[7][7] = BR;

    positions[0][1] = WKt;
    positions[0][6] = WKt;

    positions[7][1] = BKt;
    positions[7][6] = BKt;

    positions[0][2] = WB;
    positions[0][5] = WB;

    positions[7][2] = BB;
    positions[7][5] = BB;

    positions[0][3] = WQ;
    positions[7][3] = BQ;

    positions[0][4] = WK;
    positions[7][4] = BK;
    return positions;
}

