import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Navigation from './components/Navbar'
import Footer from './components/Footer'



const App = () => {
    return (
        <Router>
           <Navigation />
           <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App
