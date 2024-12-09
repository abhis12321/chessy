import Peice from './Peice';
import { useEffect, useRef, useState } from 'react';
import { useChessContext } from '@/context/Context';
import { copyPostions } from '@/helper/getIntialValues';
import { checkIfEnPassant } from '@/abriter/getPawnMove';
import { getValidAllMoves, validateMove } from '@/abriter/validMoves';
import chessMoveAudioFile from '/public/soundEffect/chessMove.mp3'
import PromotePawn from './PromotePawn';
import { ifAnyMovePossible, insufficientMaterials } from '@/abriter/ifAnyMovePossible';
import { isKingChecked } from '@/abriter/isKingChecked';
import AlertMessage from './AlertMessage';


export default function Pieces() {
    const ref = useRef();
    const [promotePromise, setPromotePromise] = useState();
    const [activeTile, setActiveTile] = useState();
    const [inActiveTile, setInActiveTile] = useState();
    const [popup, setPopup] = useState(0);
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

    const isPromoting = ({ targetRank, ChessPiece }) => {
        return ((ChessPiece === 5 && targetRank === 7) || (ChessPiece === 11 && targetRank === 0))
    }


    const playNextMove = async ({ check_turn, ChessPiece, rank, file, targetRank, targetFile }) => {
        if (check_turn && validateMove({ targetRank, targetFile, activeMoves })) {
            const nvPositions = copyPostions(positions);
            nvPositions[rank][file] = '';
            nvPositions[targetRank][targetFile] = ChessPiece;
            const chessMoveAudio = new Audio(chessMoveAudioFile);
            chessMoveAudio.play();
            if (isPromoting({ targetRank, ChessPiece })) { // pawn-promotion
                setPopup(1);
                const promotedPiece = await new Promise((resolve) => {
                    setPromotePromise(() => (choice) => {
                        resolve(choice); // Resolve the promise when a choice is made
                    });
                });
                setPopup(0);
                nvPositions[targetRank][targetFile] = promotedPiece;
            }
            if (ChessPiece % 6 == 4 && Math.abs(file - targetFile) > 1) { // castle
                let oldX = file > targetFile ? 0 : 7;
                let x = targetFile + (file > targetFile ? 1 : -1);
                nvPositions[rank][x] = nvPositions[rank][oldX];
                nvPositions[rank][oldX] = '';
            }
            checkIfEnPassant({ positions, prevPositions, rank, file, ChessPiece, targetRank, targetFile, nvPositions }); //En-passant
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
            checkIfNext({ positions: nvPositions, prevPositions: positions, castleCase, turn: chessState.turn === 'w' ? 'b' : 'w', king: chessState.turn === 'w' ? 10 : 4 });
        }
    }

    const checkIfNext = ({ positions, prevPositions, king, castleCase, turn }) => {
        if (!ifAnyMovePossible({ positions, prevPositions, castleCase, turn })) {
            if (isKingChecked({ positions, king })) {
                setPopup({ message2: `${turn === 'b' ? "Black" : "White"} CheckMate`, message1: `${chessState.turn === 'b' ? "Black" : "White"} won!` });
            } else {
                setPopup({ message1: "Game StaleMate!" });
            }
        } else if (insufficientMaterials({ positions })) {
            setPopup({ message1: "Game Draw!", message2: "insufficient material" });
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

    const handleNewGame = () => {
        setPopup(0);
        dispatch({ type: "RESET_GAME" });
    }


    return (
        <div className='w-full h-full absolute top-0 left-0 right-0 bottom-0 grid grid-cols-8 grid-flow-row bg-red-600/10' ref={ref} onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleBoardClick}>
            {
                positions?.map((rows, rank) =>
                    rows?.map((ChessPiece, file) => (ChessPiece || ChessPiece === 0) &&
                        <Peice key={`${rank}-${file}`} rank={rank} file={file} ChessPiece={ChessPiece} handleClick={handlePieceClick} activeTile={activeTile} inActiveTile={inActiveTile} />
                    ))
            }

            {
                popup === 1 ? <PromotePawn handlePromotePawn={promotePromise} start={chessState.turn === 'w' ? 0 : 6} />
                    :
                    popup != 0 && <AlertMessage message1={popup.message1} message2={popup.message2} light={chessState.turn === 'b'} handleNewGame={handleNewGame} cancelAlert={() => setPopup(0)} />
            }

        </div>
    )
}
