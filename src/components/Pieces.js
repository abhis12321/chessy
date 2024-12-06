import Peice from './Peice';
import { useRef, useState } from 'react';
import { useChessContext } from '@/context/Context';
import { isKingChecked } from '@/abriter/isKingChecked';
import { copyPostions } from '@/helper/getIntialValues';
import { validateNormalMove } from '@/abriter/validateNormalMove';

export default function Pieces() {
    const ref = useRef();
    const { chessState, dispatch } = useChessContext();
    const [activeTile, setActiveTile] = useState();
    const [inActiveTile, setInActiveTile] = useState();
    const positions = chessState.positions[chessState.positions.length - 1];

    const handleDragOver = (e) => e.preventDefault();

    const calculateCoOrdinates = (e) => {
        const { top, left, width } = ref.current.getBoundingClientRect();
        const size = width / 8;
        const targetRank = Math.floor((e.clientY - top) / size);
        const targetFile = Math.floor((e.clientX - left) / size);
        return { targetRank, targetFile };
    }

    const playNextMove = ({ check_turn, ChessPiece, rank, file, targetRank, targetFile }) => {
        if (check_turn && validateNormalMove({ positions, rank, file, ChessPiece, targetRank, targetFile })) {
            const nvPositions = copyPostions(positions);
            nvPositions[rank][file] = '';
            nvPositions[targetRank][targetFile] = ChessPiece;
            if (!isKingChecked({ positions: nvPositions, king: chessState?.turn === 'w' ? 4 : 10 })) {
                dispatch({ type: "NEW_POSITION", nvPositions });
                setActiveTile();
                setInActiveTile([targetRank, targetFile, ChessPiece]);
            }
        }
    }


    const handleDrop = (e) => {
        const { ChessPiece, rank, file } = JSON.parse(e.dataTransfer.getData('application/json'));
        const { targetRank, targetFile } = calculateCoOrdinates(e);
        const check_turn = ((chessState.turn === 'w' && ChessPiece <= 5) || (chessState.turn === 'b' && ChessPiece > 5));
        playNextMove({ check_turn, ChessPiece, rank, file, targetRank, targetFile });
    }

    const handleBoardClick = (e) => {
        const { targetRank, targetFile } = calculateCoOrdinates(e);
        if (activeTile) {
            playNextMove({ check_turn: true, ChessPiece: activeTile[2], rank: activeTile[0], file: activeTile[1], targetRank, targetFile });
        }
    }

    const handlePieceClick = ({ rank, file, ChessPiece }) => {
        const check_turn = ((chessState.turn === 'w' && ChessPiece <= 5) || (chessState.turn === 'b' && ChessPiece > 5));
        if (check_turn) {
            setActiveTile([rank, file, ChessPiece]);
        } else {
            setActiveTile();
        }
    }

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full grid grid-cols-8 grid-flow-row bg-red-600/10' ref={ref} onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleBoardClick}>
            {
                positions?.map((rows, rank) =>
                    rows?.map((ChessPiece, file) => (ChessPiece || ChessPiece === 0) &&
                        <Peice key={`${rank}-${file}`} rank={rank} file={file} ChessPiece={ChessPiece} handleClick={handlePieceClick} activeTile={activeTile} inActiveTile={inActiveTile} />
                    ))
            }
        </div>
    )
}
