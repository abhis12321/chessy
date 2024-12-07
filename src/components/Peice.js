import { useMemo } from "react";
import { CPS } from "@/helper/getIntialValues";


export default function Peice({ ChessPiece, rank, file, handleClick, activeTile, inActiveTile }) {
    const handleDragStart = (e) => {
        handleClick({ rank, file, ChessPiece })
        e.dataTransfer.setData("application/json", JSON.stringify({ ChessPiece, rank, file }));
        setTimeout(() => {
            e.target.style.display = "none"
        }, 100)
    }

    const handleDragEnd = (e) => {
        e.target.style.display = "flex"
    }

    const isActiveTile = useMemo(() => activeTile?.[0] === rank && activeTile?.[1] === file && activeTile?.[2] === ChessPiece , [activeTile]);

    const isInActiveTile = useMemo(() => inActiveTile?.[0] === rank && inActiveTile?.[1] === file && inActiveTile?.[2] === ChessPiece , [inActiveTile]);

    return (
        <button className={`absolute h-[12.5%] aspect-square flex items-center justify-center text-[calc(min(100vw,100vh)/14)] p-${rank}${file} ${ChessPiece <= 5 ? "text-white *drop-shadow-[0_0_1px_black]" : "text-black *:drop-shadow-[0_0_1px_white]"} ${isActiveTile && "bg-black/40"} ${isInActiveTile && ((rank+file)%2 ? "bg-yellow-500/35" : "bg-yellow-700/35")}`} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onClick={e => handleClick({ rank, file, ChessPiece })} >
            {CPS[ChessPiece]}
        </button>
    )
}
