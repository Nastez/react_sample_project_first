import {AppStateType} from './redux-store'

export const getUserId = (state: AppStateType) => {
    return state.auth.userId
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}