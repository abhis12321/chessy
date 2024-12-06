import { useChessContext } from '@/context/Context';
import { useMemo } from 'react'

export default function BoardTile({ index_01, index_02 }) {
    const { isActiveMove, activeMoves } = useChessContext();
    const isActiveMoveTile = useMemo(() => isActiveMove({ rank: index_01, file: index_02 }), [index_01, index_02, activeMoves, isActiveMove]);
    return (
        <div className={`h-[calc(min(100vw,100vh)/8-1px)] aspect-square text-[10px] ${(index_01 + index_02) % 2 == 0 ? "bg-amber-100/95" : "bg-amber-700"} duration-500 flex items-center justify-center`} key={`${index_01}-${index_02}`}>
            { isActiveMoveTile && <div className={`h-[40%] aspect-square rounded-full bg-black/40`} />}
        </div>
    )
}
