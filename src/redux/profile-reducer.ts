import {profileAPI} from "../api/profile-api"
import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, PostsType, ProfileType} from "../types/types"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {ResultCodesEnum} from "../api/api";

let initialState = { //параметры по умолчанию
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SN/PROFILE/ADD_POST':
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state, // Делае копию state
                posts: [...state.posts, newPost], // Хочу создать новый массив постов, поэтому Отдельно копируем массив posts, в эту копию будем пушить newPost
                newPostText: '' // У копии новый текст поста
            };
        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            };
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)

            }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType // Копируем профиль, вместо тех фото, что были ранее, устанавливаем новое фото

            }
        default:
            return state;
    }
}

// Action Creators

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

// Thunk Creators

export const getProfile = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        let getProfileData = await profileAPI.getProfiles(userId)
        dispatch(actions.setUserProfile(getProfileData))
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)

        dispatch(actions.setStatus(data))

    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            let data = await profileAPI.updateStatus(status);

            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.setStatus(status));
            }
        } catch (error) {
            // dispatch error
        }
    }
}

export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file);

        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        let data = await profileAPI.saveProfile(profile);
        if (data.resultCode === ResultCodesEnum.Success) {
            if (userId != null) {
                dispatch(getProfile(userId))
            } else {
                throw new Error('userId cant be null')
            }
        } else {
            dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }
    }
}

export default profileReducer

// Types

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes | FormAction>