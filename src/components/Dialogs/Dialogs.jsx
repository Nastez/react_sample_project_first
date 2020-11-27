import React from "react";
import s from './Dialogs.module.scss';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);

    let addNewMessage = () => {
        props.addNewMessage();
    };

    let onChangeMessage = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div>
                <div className={s.messages}>
                    {messagesElements}
                </div>
                <textarea onChange={ onChangeMessage }
                          value={props.dialogsPage.newMessageText}/>
                <button onClick={ addNewMessage } className={s.buttonAddMessage}>Add message</button>
            </div>
        </div>
    );
};

export default Dialogs;