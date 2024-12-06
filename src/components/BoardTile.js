import { useChessContext } from '@/context/Context';
import { useMemo } from 'react'

export default function BoardTile({ rank, file }) {
    const { isActiveMove, activeMoves } = useChessContext();
    const isActiveMoveTile = useMemo(() => isActiveMove({ rank, file }), [rank, file, activeMoves, isActiveMove]);
    return (
        <div className={`h-[calc(min(100vw,100vh)/8-1px)] aspect-square text-[10px] ${(rank + file) % 2 == 0 ? "bg-amber-100/95" : "bg-amber-700"} duration-500 flex items-center justify-center`} key={`${rank}-${file}`}>
            { isActiveMoveTile && <div className={`h-[40%] aspect-square rounded-full bg-black/40`} />}
        </div>
    )
}
