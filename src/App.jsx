import './App.scss';
import React from 'react';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import { Route } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";


const App = (props) => {

    return (
        <div className='app-wrapper'>
            <Header/>
            <Sidebar />
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => <DialogsContainer  /> }/>
                <Route path='/profile' render={() => <Profile  /> }/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/users' render={() => <UsersContainer /> }/>
                <Route path='/settings' component={Settings}/>
            </div>
        </div>
    );
}

export default App;
