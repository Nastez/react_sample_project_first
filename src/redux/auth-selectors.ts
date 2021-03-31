import {AppStateType} from './redux-store'

export const getUserId = (state: AppStateType) => {
    return state.auth.userId
}

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login
}