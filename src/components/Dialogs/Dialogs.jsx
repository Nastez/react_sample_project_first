import React from 'react'
import s from './Dialogs.module.scss'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, Textarea} from '../common/FormsControls/FormsControls'
import {maxLengthCreator, required} from '../../utils/validators/validators'
import {DialogsPageType} from '../../types/types'

/*type DialogsFormOwnProps = {
    dialogsPage: DialogsPageType
    sendMessage: (newMessageBody: string) => void
}

type DialogsFormValuesType = {
    newMessageBody: string
}*/

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

/*type DialogsFormValuesTypeKeys = Extract<keyof DialogsFormValuesType, string>*/

const AddMessageForm = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField('Enter new message', 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs

