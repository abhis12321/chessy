import Peice from './Peice';
import { useEffect, useRef, useState } from 'react';
import { useChessContext } from '@/context/Context';
import { copyPostions } from '@/helper/getIntialValues';
import { checkIfEnPassant } from '@/abriter/getPawnMove';
import RookMoveAudioFile from '/public/soundEffect/rook.mp3'
import knightMoveAudioFile from '/public/soundEffect/knight.mp3'
import bishopMoveAudioFile from '/public/soundEffect/bishop.mp3'
import kingMoveAudioFile from '/public/soundEffect/king.mp3'
import queenMoveAudioFile from '/public/soundEffect/queen.mp3'
import pawnMoveAudioFile from '/public/soundEffect/pawn.mp3'
import { getValidAllMoves, validateNormalMove } from '@/abriter/validMoves';



export default function Pieces() {
    const ref = useRef();
    const [activeTile, setActiveTile] = useState();
    const [inActiveTile, setInActiveTile] = useState();
    const { chessState, dispatch, activeMoves } = useChessContext();
    const castleCase = chessState.castleCase;
    const positions = chessState.positions[chessState.positions.length - 1];
    const prevPositions = chessState.positions[chessState.positions.length - 2];

    const handleDragOver = (e) => e.preventDefault();

    const calculateCoOrdinates = (e) => {
        const { top, left, width } = ref.current.getBoundingClientRect();
        const size = width / 8;
        const targetRank = Math.floor((e.clientY - top) / size);
        const targetFile = Math.floor((e.clientX - left) / size);
        return { targetRank, targetFile };
    }

    const getAudioFile = (rem) => {
        switch (rem) {
            case 0: return RookMoveAudioFile;
            case 1: return knightMoveAudioFile;
            case 2: return bishopMoveAudioFile;
            case 3: return queenMoveAudioFile;
            case 4: return kingMoveAudioFile;
            default: return pawnMoveAudioFile;
        }
    }

    const playNextMove = ({ check_turn, ChessPiece, rank, file, targetRank, targetFile }) => {
        if (check_turn && validateNormalMove({ targetRank, targetFile, activeMoves })) {
            const nvPositions = copyPostions(positions);
            nvPositions[rank][file] = '';
            nvPositions[targetRank][targetFile] = ChessPiece;
            const chessMoveAudio = new Audio(pawnMoveAudioFile);
            chessMoveAudio.play();
            if (ChessPiece % 6 == 4 && Math.abs(file - targetFile) > 1) {
                let oldX = file > targetFile ? 0 : 7;
                let x = targetFile + (file > targetFile ? 1 : -1);
                nvPositions[rank][x] = nvPositions[rank][oldX];
                nvPositions[rank][oldX] = '';
            }
            checkIfEnPassant({ positions, prevPositions, rank, file, ChessPiece, targetRank, targetFile, nvPositions })
            dispatch({ type: "NEW_POSITION", nvPositions });
            setActiveTile();
            setInActiveTile([targetRank, targetFile, ChessPiece]);
            if (rank % 7 === 0 && file % 7 === 0 && ChessPiece % 6 === 0) {
                const x = rank === 0 ? 0 : 1;
                const y = file === 0 ? 0 : 1;
                castleCase[x][y] = false;
                dispatch({ type: "CANCEL_CASTLE", castleCase });
            } else if (rank % 7 === 0 && file === 3 && ChessPiece % 6 == 4) {
                const x = rank === 0 ? 0 : 1;
                castleCase[x][0] = false;
                castleCase[x][1] = false;
                dispatch({ type: "CANCEL_CASTLE", castleCase });
            }
        }
    }


    const handleDrop = (e) => {
        const { ChessPiece, rank, file } = JSON.parse(e.dataTransfer.getData('application/json'));
        const { targetRank, targetFile } = calculateCoOrdinates(e);
        const check_turn = ((chessState.turn === 'w' && ChessPiece <= 5) || (chessState.turn === 'b' && ChessPiece > 5));
        playNextMove({ check_turn, ChessPiece, rank, file, targetRank, targetFile });
    }

    const handleBoardClick = (e) => {
        const { targetRank, targetFile } = calculateCoOrdinates(e);
        if (activeTile) {
            playNextMove({ check_turn: true, ChessPiece: activeTile[2], rank: activeTile[0], file: activeTile[1], targetRank, targetFile });
        }
    }

    const handlePieceClick = ({ rank, file, ChessPiece }) => {
        const check_turn = ((chessState.turn === 'w' && ChessPiece <= 5) || (chessState.turn === 'b' && ChessPiece > 5));
        if (check_turn) {
            setActiveTile([rank, file, ChessPiece]);
        } else {
            setActiveTile();
        }
    }


    useEffect(() => {
        if (activeTile) {
            const rank = activeTile[0];
            const file = activeTile[1];
            const ChessPiece = activeTile[2];
            dispatch({ type: "SET_ACTIVE_MOVE", activeMoves: getValidAllMoves({ positions, rank, file, ChessPiece, prevPositions, castleCase }) });
        } else {
            dispatch({ type: "SET_ACTIVE_MOVE", activeMoves: [] });
        }
    }, [activeTile]);


    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full grid grid-cols-8 grid-flow-row bg-red-600/10' ref={ref} onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleBoardClick}>
            {
                positions?.map((rows, rank) =>
                    rows?.map((ChessPiece, file) => (ChessPiece || ChessPiece === 0) &&
                        <Peice key={`${rank}-${file}`} rank={rank} file={file} ChessPiece={ChessPiece} handleClick={handlePieceClick} activeTile={activeTile} inActiveTile={inActiveTile} />
                    ))
            }
        </div>
    )
}
