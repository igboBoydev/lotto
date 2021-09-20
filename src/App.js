import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Navigation from './components/Navbar'
import Footer from './components/Footer'
import Register from './Authenticate/Register';
import { Validate } from './Authenticate/Validate';
import Games from './Games';
import Voice from './Authenticate/Voice';
import Whatsapp from './Authenticate/Whatsapp';
import Reset from './PasswordReset/Reset';
import Login from './Authenticate/Login';



const App = () => {
    return (
        <Router>
           <Navigation />
           <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route exact path='/validate'>
                    <Validate />
                </Route>
                <Route exact path='/profile/login'>
                    <Login />
                </Route>
                <Route exact path='/validate/voice'>
                    <Voice />
                </Route>
                <Route exact path='/validate/whatsapp'>
                    <Whatsapp />
                </Route>
                 <Route exact path='/games'>
                    <Games />
                </Route>
                <Route exact path='/profile/reset'>
                    <Reset />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App
