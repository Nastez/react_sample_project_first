import React, {useEffect} from 'react'
import Paginator from '../common/Pagination/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import {FilterType, requestUsers, followT, unfollowT} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors'

export const Users: React.FC = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(followT(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowT(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}

            />
            <div>
                {users.map(u => <User key={u.id} user={u}
                                      followingInProgress={followingInProgress}
                                      follow={follow}
                                      unfollow={unfollow}/>)}
            </div>
        </div>
    )
}
