import './App.scss';
import React from 'react';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import Route from "react-router-dom/es/Route";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";

const App = (props) => {

    return (
        <div className='app-wrapper'>
            <Header/>
            <Sidebar sidebar={props.state.sidebar}/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => <Dialogs dialogsPage={props.state.dialogsPage}
                                                              addMessage={props.addMessage}
                                                              updateNewMessageText={props.updateNewMessageText}
                />}/>
                <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}
                                                              addPost={props.addPost}
                                                              updateNewPostText={props.updateNewPostText}/>}/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
            </div>
        </div>
    );
}

export default App;
