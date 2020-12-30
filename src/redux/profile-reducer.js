import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = { //параметры по умолчанию
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likeCounts: 0
            };
            return {
                ...state, // Делае копию state
                posts: [...state.posts, newPost], // Хочу создать новый массив постов, поэтому Отдельно копируем массив posts, в эту копию будем пушить newPost
                newPostText: '' // У копии новый текст поста
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)

            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} // Копируем профиль, вместо тех фото, что были ранее, устанавливаем новое фото

            }
        default:
            return state;
    }
};
// Action Creators
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

// Thunk Creators
export const getProfile = (userId) => {

    return async (dispatch) => {
        let response = await usersAPI.getProfiles(userId);

        dispatch(setUserProfile(response.data));
    }
};

export const getStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId);

        dispatch(setStatus(response.data));

    }
};

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
};

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);

        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }
    }
};
export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getProfile(userId));
        } else {
            dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0]);
        }
    }
};

export default profileReducer;