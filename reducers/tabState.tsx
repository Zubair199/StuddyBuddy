const tabState = (state=[], action)=>{
    switch(action.type){
        case 'ACTIVE':{
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        }
        case "NON_ACTIVE":
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        default:
            return state
    }
}
export default tabState;