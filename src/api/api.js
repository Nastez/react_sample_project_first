import * as axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '8a18f04d-4e52-45f1-b3a6-aca0d2a9e6ac'
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
            return response.data;
        })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => {
                return response.data;
        })
    },
    unfollow(userId) {
            return instance.delete(`follow/${userId}`).then(response => {
                return response.data;
            })
    },
    getProfiles(userId) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfiles(userId);
    },
    getAuthData() {
        return instance.get(`auth/me`)
    }
};

export const profileAPI = {
    getProfiles(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    }
};


export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) { // Должны прийти из вне, если rememberMe не придет, false
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};

