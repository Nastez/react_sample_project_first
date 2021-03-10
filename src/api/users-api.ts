import {GetItemsType, instance, ServerResponseType} from './api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post<ServerResponseType>(`follow/${userId}`).then(response => {
            return response.data
        })
    },
    unfollow(userId: number) {
        return instance.delete<ServerResponseType>(`follow/${userId}`).then(response => {
            return response.data
        })
    }
}