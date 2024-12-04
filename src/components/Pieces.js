"use client"
import { getInitalPositions } from '@/helper/getIntialValues';
import Peice from './Peice';
import { useState } from 'react';

export default function Pieces() {
    const [positions , setPositions] = useState(getInitalPositions());

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 grid grid-cols-8 grid-flow-row ring-4 ring-white'>
            {
                positions?.map((rows, rank) =>
                    rows?.map((ChessPiece, file) => ChessPiece ?
                        <Peice key={`${rank}-${file}`} rank={rank} file={file} ChessPiece={ChessPiece}/>
                        :
                        null
                    ))
            }
        </div>
    )
}
