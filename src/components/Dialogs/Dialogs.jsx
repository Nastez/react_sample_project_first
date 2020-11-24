import React from "react";
import s from './Dialogs.module.scss';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} name={d.name}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>);

    let newMessageElement = React.createRef();

    let addNewMessage = () => {
        props.addMessage();
    };

    let onChangeMessage = () => {
        let text = newMessageElement.current.value;
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
                <textarea onChange={onChangeMessage} ref={newMessageElement}
                          value={props.dialogsPage.newMessageText}></textarea>
                <button onClick={addNewMessage} className={s.buttonAddMessage}>Add message</button>
            </div>
        </div>
    );
}

export default Dialogs;