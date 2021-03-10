import React from 'react'
import Paginator from '../common/Pagination/Paginator'
import User from './User'
import {UserType} from '../../types/types'
import UsersSearchForm from './UsersSearchForm'
import {FilterType} from '../../redux/users-reducer'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, onFilterChanged, ...props}) => {

    return (
        <div>
            <div><UsersSearchForm onFilterChanged={onFilterChanged}/></div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}

            />
            <div>
                {users.map(u => <User key={u.id} user={u}
                                      followingInProgress={props.followingInProgress}
                                      follow={props.follow}
                                      unfollow={props.unfollow}/>)}
            </div>
        </div>
    )
}



export default Users