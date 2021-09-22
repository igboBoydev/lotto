const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                newAlert: action.payload,
                isSubmitted: true,
            }
        case "REGISTER_ALERT":
            const alerts = { ...state.alert, getAlert: action.payload };
            return {
                ...state,
                alert: alerts
            }
        case "SHOW_PROFILE":
            const getProfile = { ...state.profile, showProfile: action.payload };
            return {
                ...state,
                profile: getProfile.showProfile
            }
        case "GET_VALUES":
            return {
                ...state,
                value: action.payload
            }
        case "GIVE_LOGIN_ACCESS":
            const getToken = { ...state.isLoggedIn, showAlert: action.payload }
            return {
                ...state,
                isLoggedIn: getToken.showAlert
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