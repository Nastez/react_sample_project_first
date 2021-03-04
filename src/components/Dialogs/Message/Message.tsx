import React from "react";
import s from './../Dialogs.module.scss';

type Props = {
    message: string
}

const Message: React.FC<Props> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
};

export default Message;