import {DialogsType, MessagesType} from "../types/types"
import {InferActionsTypes} from "./redux-store"

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your IT?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<MessagesType>
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SN/DIALOGS/ADD_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export const actions = {
    addMessageActionCreator: (newMessageBody: string) => ({type: 'SN/DIALOGS/ADD_MESSAGE', newMessageBody} as const)
}

export default dialogsReducer

// Types

type ActionsTypes = InferActionsTypes<typeof actions>

export type InitialStateType = typeof initialState
