import axios from "axios"
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '8a18f04d-4e52-45f1-b3a6-aca0d2a9e6ac'
    }
})

export type ServerResponseType<D = {}, RC = ResultCodesEnum> = {
    resultCode: RC
    messages: Array<string>
    data: D
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10

}


