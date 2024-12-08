import { useChessContext } from '@/context/Context';
import { useMemo } from 'react'

export default function BoardTile({ rank, file }) {
    const light = (rank + file) % 2;
    const { isActiveMove, activeMoves } = useChessContext();
    const isActiveMoveTile = useMemo(() => isActiveMove({ rank, file }), [rank, file, activeMoves, isActiveMove]);
    return (
        <div className={`h-[calc(min(100vw,100vh,700px)/8-1px)] aspect-square text-[10px] ${light ? "bg-amber-700" : "bg-amber-100/95"} duration-500 flex items-center justify-center ${isActiveMoveTile && (light ? "shadow-[0_0_10px_white_inset]" : "shadow-[0_0_14px_orange_inset] shadow-amber-700")}`} key={`${rank}-${file}`}>
            { isActiveMoveTile && <div className={`h-[30%] aspect-square rounded-full bg-black/30`} />}
        </div>
    )
}
