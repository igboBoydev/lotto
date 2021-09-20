const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            const newUsers = { ...state.newUsers, user: action.payload }
            return {
                ...state,
                newUsers: newUsers,
                isSubmitted: true,
            }
        case "REGISTER_ALERT":
            const alerts = { ...state.alert, getAlert: action.payload };
            console.log(alerts)
            return {
                ...state,
                alert: alerts
            }
        case "GET_VALUES":
            return {
                ...state,
                value: action.payload
            }
        case 'DISPLAY_GAMES':
            return { ...state, game: action.payload, loadimg: true };
        case 'NO_USER':
            return {
                ...state,
                isSubmitted: false
            }
        case "GET_VOICE":
            const voice = { ...state.voice, voices: action.payload };
            return {
                ...state,
                voice: voice
            }
        case "GET_WHATSAPP":
            const whatsapp = { ...state.whatsapp, whatsapps: action.payload };
            return {
                ...state,
                whatsapp: whatsapp
            }
        case "GET_DAYS_IN_WEEK":
            return {
                ...state,
                days: action.payload
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