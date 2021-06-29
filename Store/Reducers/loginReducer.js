const initialState={pseudo : null,
                    refresh_token: null,
                    access_token : null,
                    listFavorite : null}
function loginReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CONNECT':
            nextState = {
                refresh_token: action.refresh_token,
                pseudo : action.pseudo,
                access_token: action.access_token,
                listFavorite: action.listFavorite
            }
            return nextState || state
        case "TOGGLE_FAVORITE" : 
            console.log("you are inside TOGGLE_FAVORITE ")
            const favoriteImageIndex = state.listFavorite.findIndex(item => item.id === action.value.id)
            if(favoriteImageIndex!== -1){
                nextState={
                    ...state,
                    listFavorite : state.listFavorite.filter((item,index) => index !==favoriteImageIndex)
                }
            }else{
                nextState={
                    ...state,
                   listFavorite: [...state.listFavorite,action.value]
                }
            }
            return nextState || state
        default:
            return state    
    }
}
export default loginReducer