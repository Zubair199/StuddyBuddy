const login = (userObj) => {
    return {
        type: "LOGIN",
        payload: userObj
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    login,
    logOut
}