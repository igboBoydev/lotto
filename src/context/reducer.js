const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            const newUsers = { ...state.user, user: action.payload }
            return {
                ...state,
                newUsers: newUsers,
                isSubmitted: true,
                isRegistered: true
            }
        case 'NO_USER':
            return {
                ...state,
                isSubmitted: false
            }
        case 'LOADING':
            return {
                ...state,
                loadimg: true
            }
        case "VALIDATE_SENT_TOKEN":
            return {}
        case "LOGIN":
            let grantAccess = { ...state.userLogin, userLogin: action.payload }
            return {
                ...state,
                grantAccess: grantAccess,
                isLoggedIn: true
            }
        case "CANCEL_GAME":
            return {}
        case "LOG_OUT":
            return {
                ...state,
                user: [],
                isLoggedIn: false
            }
        default:
            return state;

    }
}

export default reducer