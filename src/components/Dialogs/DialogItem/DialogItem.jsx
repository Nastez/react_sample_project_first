import React from "react";
import s from './../Dialogs.module.scss';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>

            <NavLink to={path}>
                <div className={s.dialogItem}>
                    <img src='https://archilab.online/images/1/123.jpg'/>
                    {props.name}
                </div>
            </NavLink>
        </div>
    )
};


export default DialogItem;