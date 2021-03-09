import React from 'react'
import s from './Dialogs.module.scss'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {createField, GetStringKeys, Textarea} from '../common/FormsControls/FormsControls'
import {maxLengthCreator, required} from '../../utils/validators/validators'
import {DialogsPageType} from '../../types/types'
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values: NewMessageFormValuesType) => {
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

type NewMessageFormValuesKeysType =  GetStringKeys<NewMessageFormValuesType>

type AddMessageFormPropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, AddMessageFormPropsType> & AddMessageFormPropsType> = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>('Enter new message', 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, AddMessageFormPropsType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs

