import {getAuthDataThunkCreator} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
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

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
});

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthDataThunkCreator());
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());
            })
    }
};


export default appReducer;