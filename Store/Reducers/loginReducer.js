const initialState={pseudo : null,
                    access_token : null}
function loginReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CONNECT':
            nextState = {
                pseudo : action.pseudo,
                access_token: action.access_token
            }
            return nextState || state
        default:
            return state    
    }
}
export default loginReducer