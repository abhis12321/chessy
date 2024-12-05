import Peice from './Peice';
import { useRef } from 'react';
import { copyPostions } from '@/helper/getIntialValues';
import { useChessContext } from '@/context/Context';
import { validateNormalMove } from '@/abriter/validateNormalMove';
import { isKingChecked } from '@/abriter/isKingChecked';

export default function Pieces() {
    const ref = useRef();
    const { chessState, dispatch } = useChessContext();
    const positions = chessState.positions[chessState.positions.length - 1];

    const handleDragOver = (e) => e.preventDefault();

    const calculateCoOrdinates = (e) => {
        const { top, left, width } = ref.current.getBoundingClientRect();
        const size = width / 8;
        const targetRank = Math.floor((e.clientY - top) / size);
        const targetFile = Math.floor((e.clientX - left) / size);
        return { targetRank, targetFile };
    }


    const handleDrop = (e) => {
        const { ChessPiece, rank, file } = JSON.parse(e.dataTransfer.getData('application/json'));
        const { targetRank, targetFile } = calculateCoOrdinates(e);
        const check_turn = ((chessState.turn === 'w' && ChessPiece <= 5) || (chessState.turn === 'b' && ChessPiece > 5))
        if(check_turn && validateNormalMove({ positions, rank, file, ChessPiece, targetRank, targetFile })) {
            const nvPositions = copyPostions(positions);
            nvPositions[rank][file] = '';
            nvPositions[targetRank][targetFile] = ChessPiece;
            if(!isKingChecked({ positions: nvPositions, king: chessState?.turn === 'w' ? 4 : 10 })) {
                dispatch({ type: "NEW_POSITION", nvPositions })
            }
        }
    }

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full grid grid-cols-8 grid-flow-row bg-red-600/10' ref={ref} onDragOver={handleDragOver} onDrop={handleDrop}>
            {
                positions?.map((rows, rank) =>
                    rows?.map((ChessPiece, file) => (ChessPiece || ChessPiece === 0) &&
                        <Peice key={`${rank}-${file}`} rank={rank} file={file} ChessPiece={ChessPiece} />
                    ))
            }
        </div>
    )
}
