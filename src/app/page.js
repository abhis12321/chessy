"use client"
import Board from "@/components/Board";
import { files, initialChessState, ranks } from "@/helper/getIntialValues";
import RanksBar from "@/components/RanksBar";
import FilesBar from "@/components/FilesBar";
import { ChessContext } from "@/context/Context";
import { useReducer } from "react";
import { reducer } from "@/reducer/reducer";

export default function page() {
  const [chessState , dispatch] = useReducer(reducer , initialChessState);

  return (
    <ChessContext.Provider value={{ chessState , dispatch }}>
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
