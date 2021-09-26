import React, { useEffect, useContext, useReducer } from 'react';
import reducer from './reducer'
const url = "http://localhost:5016/api/v1/lotto"

const AppContext = React.createContext()

const initialState = {
    isLoggedIn: '',
    loading: false,
    value: [],
    voice: '',
    logedIn: false,
    whatsapp: '',
    newALert: '',
    profile: null,
    alert: [],
    game: [],
    days: [],
    week: [],
    registered: [],
    loggedIn: [],
    grantAccess: [],
    bookedGames: 0,
    canceledGames: 0,
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addAlert = (user) => {
        dispatch({ type: "ADD_USER", payload: user });
    }

    const RegisterAlert = (prop) => {
        dispatch({ type: "REGISTER_ALERT", payload: prop });
    }

    const getValues = (values) => {
        dispatch({type: "GET_VALUES", payload: values})
    }

    const logOut = (event) => {
        dispatch({type: "LOG_OUT", payload: event})
    }

    const fetchData = async () => {
        dispatch({type: 'LOADING'})
        try {
            const res = await fetch(url)
            const data = await res.json()
            const arr = data.lotto
            dispatch({type: "DISPLAY_GAMES", payload: arr})
        } catch (err) {
            console.log(`hello error from the api server:  ${err}`)
        }
        
    }

    useEffect(() => {
        fetchData()
    }, [])

    const daysOfWeek = () => {
        function GetDates(startDate, daysToAdd) {
            var aryDates = [];

            for (var i = 0; i <= daysToAdd; i++) {
                var currentDate = new Date();
                currentDate.setDate(startDate.getDate() + i);
                aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()));
            }

             return aryDates;
        }

        function MonthAsString(monthIndex) {
            var month = [];
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sept";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            return month[monthIndex];
        }

        function DayAsString(dayIndex) {
            var weekdays = new Array(7);
            weekdays[0] = "Sun";
            weekdays[1] = "Mon";
            weekdays[2] = "Tue";
            weekdays[3] = "Wed";
            weekdays[4] = "Thu";
            weekdays[5] = "Fri";
            weekdays[6] = "Sat";

            return weekdays[dayIndex];
        }


        var startDate = new Date();
        var aryDates = GetDates(startDate, 7);
        dispatch({type: "GET_DAYS_IN_WEEK", payload: aryDates})
    }

    useEffect(() => {
        daysOfWeek()
    }, [])

    const showVoice = (event) => {
        dispatch({type: "GET_VOICE", payload: event})
    }

    const showBoard = (event) => {
        dispatch({type: "SHOW_PROFILE", payload: event})
    } 

    const giveAccess = (event) => {
        dispatch({type: "GIVE_LOGIN_ACCESS", payload: event})
    }

    const showWhatsapp = (event) => {
        dispatch({ type: "GET_WHATSAPP", payload: event });
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

    

    return (
        <AppContext.Provider value={{
            ...state,
            addAlert,
            getValues,
            validateRegistration,
            daysOfWeek,
            loggingIn,
            cancelGame,
            noUser,
            showVoice,
            logOut,
            showBoard,
            showWhatsapp,
            giveAccess,
            RegisterAlert
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider };
