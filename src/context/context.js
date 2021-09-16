import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer'

const AppContext = createContext()

const initialState = {
    isLoading: false,
    isRegistered: false,
    isLoggedIn: false,
    isSubmitted: false,
    newUsers: [],
    grantAccess: [],
    bookedGames: 0,
    canceledGames: 0,
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addUser = (user) => {
        dispatch({ type: "ADD_USER", payload: user });
    }
    
    const validateRegistration = () => {
        dispatch({type: "VALIDATE_SENT_TOKEN"})
    }
    
    const loggingIn = (userLogin) => {
        dispatch({type: "LOGIN", payload: userLogin})
    }

    const noUser = () => {
        dispatch({ type: "NO_USER" });
    }

    const cancelGame = (gameId) => {
        dispatch({type: "CANCEL_GAME", payload: gameId})
    }

    const logOut = (userId) => {
        dispatch({type: "LOG_OUT", payload: userId})
    }

    return (
        <AppContext.Provider value={{
            ...state,
            addUser,
            validateRegistration,
            loggingIn,
            cancelGame,
            noUser
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider };

