

export default function Peice({ ChessPiece, rank, file }) {
    const handleDragStart = () => {

    }

    const handleDragEnd = () => {

    }

    return (
        <button className={`absolute h-[calc(min(100vw,100vh)/8)] sm:h-[calc(min(100vw,100vh)/9)] aspect-square p-${rank}${file} flex items-center justify-center`} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            { ChessPiece } 
        </button>
    )
}
