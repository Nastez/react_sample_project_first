import React from 'react';
import Paginator from "../common/Pagination/Paginator";
import User from "./User";

const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, portionSize, ...props}) => {

    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       portionSize={portionSize}
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

export default Users;