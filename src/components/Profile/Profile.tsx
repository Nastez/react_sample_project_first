import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

type PropsType = {
    isOwner: boolean
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile