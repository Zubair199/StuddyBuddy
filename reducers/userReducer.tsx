const userItem = (state=[], action)=>{
    switch(action.type){
        case 'LOGIN':{
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        }
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        default:
            return state
    }
}
export default userItem;