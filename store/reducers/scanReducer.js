const initialState = { scan: "" }

export function scanReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
    case 'ADD_NODE':
        nextState = {
            ...state,
            scan: action.value
        }
        console.log(nextState)
        return nextState || state
    default:
        return state
    }
}