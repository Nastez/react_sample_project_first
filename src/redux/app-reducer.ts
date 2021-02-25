import {AnyAction} from "redux";
import {getAuthDataThunkCreator} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';



export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, // Делаем копию state
                initialized: true // Перезатираем initialized
            }
        default:
            return state;
    }
};

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS
});

export const initializeApp = () => {
    return (dispatch: ThunkDispatch<InitialStateType, void, AnyAction>) => {
        let promise = dispatch(getAuthDataThunkCreator());
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());
            })
    }
};

export default appReducer;