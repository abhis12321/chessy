"use client"
import Peice from './Peice';
import { useRef, useState } from 'react';
import { copyPostions, getInitalPositions } from '@/helper/getIntialValues';

export default function Pieces() {
    const ref = useRef();
    const [positions , setPositions] = useState(getInitalPositions());

    const handleDragOver = (e) => e.preventDefault();

    const calculateCoOrdinates = (e) => {
        const { top , left , width } = ref.current.getBoundingClientRect();
        const size = width / 8;
        const targetRank = Math.floor((e.clientY - top) / size);
        const targetFile = Math.floor((e.clientX - left) / size);
        return { targetRank , targetFile};
    }

    const handleDrop = (e) => {
        const { targetRank , targetFile } = calculateCoOrdinates(e);
        const { ChessPiece , rank, file } = JSON.parse(e.dataTransfer.getData('application/json'));

        const nvPositions = copyPostions(positions);
        nvPositions[rank][file] = '';
        nvPositions[targetRank][targetFile] = ChessPiece;
        setPositions(nvPositions);
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
