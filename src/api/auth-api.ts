import {instance, ResultCodeForCaptchaEnum, ResultCodesEnum, ServerResponseType} from "./api"

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    getAuthData() {
        return instance.get<ServerResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data) // Return then promise
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) { // Должны прийти из вне, если rememberMe не придет, false
        return instance.post<ServerResponseType<LoginResponseDataType, ResultCodeForCaptchaEnum | ResultCodesEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    }
}