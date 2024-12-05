import { CPS } from "@/helper/getIntialValues";


export default function Peice({ ChessPiece, rank, file }) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/json", JSON.stringify({ ChessPiece, rank, file }));
        setTimeout(() => {
            e.target.style.display = "none"
        }, 100)
    }

    const handleDragEnd = (e) => {
        e.target.style.display = "flex"
    }


    return (
        <button className={`absolute h-[12.5%] aspect-square flex items-center justify-center text-[calc(min(100vw,100vh)/14)] p-${rank}${file} ${ChessPiece <= 5 ? "text-white *drop-shadow-[0_0_1px_black]" : "*:drop-shadow-[0_0_1px_white]"}`} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {CPS[ChessPiece]}
        </button>
    )
}
