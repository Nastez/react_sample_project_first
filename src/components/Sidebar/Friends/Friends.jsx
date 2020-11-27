import React from 'react';
import s from './Friends.module.scss';
//import Friend from "./Friend/Friend";

const Friends = (props) => {

    //let friendsElements = props.friends.map( f => <Friend name={f.name} />)

    return (
        <div>
            <div className={s.friendsTitle}>Friends</div>
            {/*{ friendsElements }*/}
        </div>
    );
}

export default Friends;