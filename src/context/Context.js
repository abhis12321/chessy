import { createContext, useContext } from "react";

export const ChessContext = createContext();

export const useChessContext = () => useContext(ChessContext);