import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {authAPI} from "../api/auth-api"
import {securityAPI} from "../api/security-api"

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false, // залогинен ли пользователь
    captchaUrl: null as string | null // if null, then captcha is not required
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload

            }
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)
}

// Thunk Creators

export const getAuthDataThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        let meData = await authAPI.getAuthData();
        if (meData.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = meData.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        let loginData = await authAPI.login(email, password, rememberMe, captcha);
        if (loginData.resultCode === ResultCodesEnum.Success) {
            // success, get auth data
            dispatch(getAuthDataThunkCreator());
        } else {
            if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }

    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const captchaData = await securityAPI.getCaptchaUrl();
        const captchaUrl = captchaData.url;
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl)); // Диспатчим в state, чтобы state изменился
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let logoutData = await authAPI.logout();
        if (logoutData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer

// Types

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes | FormAction>