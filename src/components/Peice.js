import { CPS } from "@/helper/getIntialValues";


export default function Peice({ ChessPiece, rank, file }) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/json", JSON.stringify({ ChessPiece, rank, file }));
        setTimeout(() => {
            e.target.style.display = "none"
        }, 0)
    }

    const handleDragEnd = (e) => {
        e.target.style.display = "flex"
    }


    return (
        <button className={`absolute h-[12.5%] aspect-square p-${rank}${file} flex items-center justify-center`} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {CPS[ChessPiece]}
        </button>
    )
}
