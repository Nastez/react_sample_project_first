import React from 'react';
import s from './Sidebar.module.scss';
import Navbar from "./Navbar/Navbar";
import Friends from "./Friends/Friends";

const Sidebar = (props) => {

    return (
        <div className={s.sidebar}>
            <Navbar />
            <Friends friends={props.state.friends}/>
        </div>
    )
}

export default Sidebar;