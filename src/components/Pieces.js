import Peice from './Peice';
import { useRef } from 'react';
import { copyPostions } from '@/helper/getIntialValues';
import { useChessContext } from '@/context/Context';
import { getRookMove } from '@/abriter/getRootMove';

export default function Pieces() {
    const ref = useRef();
    const { chessState , dispatch } = useChessContext();
    const positions = chessState.positions[chessState.positions.length - 1];

    const handleDragOver = (e) => e.preventDefault();

    const calculateCoOrdinates = (e) => {
        const { top , left , width } = ref.current.getBoundingClientRect();
        const size = width / 8;
        const targetRank = Math.floor((e.clientY - top) / size);
        const targetFile = Math.floor((e.clientX - left) / size);
        return { targetRank , targetFile};
    }

    const isValidMove_01 = ({ targetRank , targetFile , ChessPiece}) => {  
        const check_00 = positions[targetRank][targetFile] !== '';
        const check_01 = (positions[targetRank][targetFile] > 5 && ChessPiece > 5);
        const check_02 = (positions[targetRank][targetFile] <= 5 && ChessPiece <= 5);
        const check_10 = (ChessPiece > 5 && chessState.turn === 'w');
        const check_11 = (ChessPiece <= 5  && chessState.turn === 'b');
        
        if((check_00 && (check_01 || check_02)) || check_10 || check_11) {
            return false;
        }
        return true;
    }

    const handleDrop = (e) => {
        const { ChessPiece , rank, file } = JSON.parse(e.dataTransfer.getData('application/json'));
        const { targetRank , targetFile } = calculateCoOrdinates(e);
        if(!isValidMove_01({ targetRank , targetFile , ChessPiece })) {
            return;
        }
        const nvPositions = copyPostions(positions);
        nvPositions[rank][file] = '';
        nvPositions[targetRank][targetFile] = ChessPiece;
        dispatch({ type:"NEW_POSITION" , nvPositions})
        if(ChessPiece == 0 || ChessPiece === 6) {
            console.log(getRookMove({ positions , rank , file , ChessPiece }));
        }
    }

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full grid grid-cols-8 grid-flow-row bg-red-600/10' ref={ref} onDragOver={handleDragOver} onDrop={handleDrop}>
            {
                positions?.map((rows, rank) =>
                    rows?.map((ChessPiece, file) => (ChessPiece || ChessPiece === 0) &&
                        <Peice key={`${rank}-${file}`} rank={rank} file={file} ChessPiece={ChessPiece}/>
                    ))
            }
        </div>
    )
}
