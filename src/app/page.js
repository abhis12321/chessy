"use client"
import Board from "@/components/Board";
import { reducer } from "@/reducer/reducer";
import RanksBar from "@/components/RanksBar";
import FilesBar from "@/components/FilesBar";
import { ChessContext } from "@/context/Context";
import { useCallback, useReducer } from "react";
import { files, initialChessState, ranks } from "@/helper/getIntialValues";
import PromotePawn from "@/components/PromotePawn";

export default function page() {
  const [chessState, dispatch] = useReducer(reducer, initialChessState);
  const activeMoves = chessState.activeMoves;

  const isActiveMove = useCallback(({ rank, file }) => {
    if (activeMoves) {
      for (let i = 0; i < activeMoves?.length; i++) {
        if (activeMoves[i][0] === rank && activeMoves[i][1] === file) {
          return true;
        }
      }
    }
    return false;
  }, [activeMoves]);


  return (
    <ChessContext.Provider value={{ chessState, dispatch, activeMoves, isActiveMove }}>
      <div className="min-h-[100vh] w-full p-1 bg-gray-800/95 flex flex-col sm:gap-3 items-center justify-center duration-500">
        <div className="relative w-fit h-fit">
          <RanksBar />
          <Board files={files} ranks={ranks} />
          <FilesBar />
        </div>
      </div>
    </ChessContext.Provider>
  )
}
