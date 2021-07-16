import React, { createContext, useReducer } from 'react';
import { Route, Switch } from 'react-router';
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
// Applicant component
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Allotment from './components/Allotment';import Logout from './components/Logout';
// Employee components
import Dashboard from './componentemp/Home';
import Aboute from './componentemp/About';
import Contacte from './componentemp/Contact';
import Logine from './componentemp/Login';
import Signupe from './componentemp/Signup';
import Rule from './componentemp/Rule';
import Logoute from './componentemp/Logout';
import Defaulter from './componentemp/Defaulter';
import ViewApplicant from './componentemp/ViewApplicant';


import Main from './Main';
import Errorpage from './components/Errorpage';
import { initialState, reducer } from '../src/reducer/useReducer';

// 1. Context API
export const UserContext = createContext();




const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Switch>
        <Route exact path='/'><Main /></Route>
        <Route path="/home"><Home /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/contact"><Contact /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Signup /></Route>
        <Route path="/logout"><Logout /></Route>
        <Route path="/dashboard"><Dashboard /></Route>
        <Route path="/aboute"><Aboute /></Route>
        <Route path="/contacte"><Contacte /></Route>
        <Route path="/logine"><Logine /></Route>
        <Route path="/signupe"><Signupe /></Route>
        <Route path="/rule"><Rule /></Route>
        <Route path="/logoute"><Logoute /></Route>
        <Route path="/defaulter"><Defaulter /></Route>
        <Route path="/viewapplicant"><ViewApplicant /></Route>
        <Route path="/allotment"><Allotment /></Route>
        <Route ><Errorpage /></Route>
      </Switch>
    </UserContext.Provider>
  )
}

export default App;
