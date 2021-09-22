import React, { useEffect, useContext, useReducer } from 'react';
import reducer from './reducer'
const url = "http://localhost:5016/api/v1/lotto"

const AppContext = React.createContext()

const initialState = {
    isLoading: false,
    isRegistered: false,
    isLoggedIn: '',
    isSubmitted: false,
    loading: false,
    value: [],
    voice: '',
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
                aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
            }

             return aryDates;
        }

        function MonthAsString(monthIndex) {
            var d = new Date();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            return month[monthIndex];
        }

        function DayAsString(dayIndex) {
            var weekdays = new Array(7);
            weekdays[0] = "Sunday";
            weekdays[1] = "Monday";
            weekdays[2] = "Tuesday";
            weekdays[3] = "Wednesday";
            weekdays[4] = "Thursday";
            weekdays[5] = "Friday";
            weekdays[6] = "Saturday";

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

    const logOut = (userId) => {
        dispatch({type: "LOG_OUT", payload: userId})
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
