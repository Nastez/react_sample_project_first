import {getAuthDataThunkCreator} from "./auth-reducer"
import {BaseThunkType, InferActionsTypes} from "./redux-store"

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state, // Делаем копию state
                initialized: true // Перезатираем initialized
            }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({
        type: 'SN/APP/INITIALIZED_SUCCESS'
    } as const)
}

export const initializeApp = (): ThunkType => {
    return (dispatch) => {
        let promise = dispatch(getAuthDataThunkCreator());
        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSuccess());
            })
    }
}

export default appReducer

// Types

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes, void>
