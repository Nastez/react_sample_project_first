import {GetItemsType, instance, ServerResponseType} from "./api"

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
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