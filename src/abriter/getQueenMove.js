import { getBishopMove } from "./getBishopMove"
import { getRookMove } from "./getRootMove"


export const getQueenMove = ({ positions, rank, file, ChessPiece }) => {
    return [...getRookMove({ positions, rank, file, ChessPiece }) , ...getBishopMove({ positions, rank, file, ChessPiece })]
}