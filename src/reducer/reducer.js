export const reducer = (state , action) => {
    switch(action.type) {
        case "NEW_POSITION" : {
            const positions = [...state.positions , action.nvPositions]
            const turn = state.turn === 'w' ? 'b' : 'w';
            return {
                ...state,
                positions,
                turn,
            }
        }
        case "OLD_POSITION" : {
            const positions = [...state.positions].pop();
            const turn = state.turn === 'w' ? 'b' : 'w';
            return {
                ...state,
                positions,
                turn,
            }
        }
        case "CANCEL_CASTLE" : {
            return {
                ...state,
                castleCase:action.castleCase,
            }
        }
        case "SET_ACTIVE_MOVE" : {
            return {
                ...state,
                activeMoves:action.activeMoves,
            }
        }
        default:
            return state;
    }
}