import React, {useEffect} from 'react'
import Profile from './Profile'
import {useDispatch, useSelector} from 'react-redux'
import {getProfile, getStatus} from '../../redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {getUserId} from '../../redux/auth-selectors'

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType>

const ProfilePage: React.FC<PropsType> = (props) => {

    const authorizedUserId = useSelector(getUserId)

    const dispatch = useDispatch()

    const refreshProfile = () => {

        let userId: number | null = +props.match.params.userId
        if (!userId) {
            userId = authorizedUserId
            if (!userId) {
                props.history.push('/login')
            }
        }

        if (!userId) {
            console.error('ID should exists in URI params or in state(authorizedUserId)')
        } else {
            dispatch(getProfile(userId as number))
            dispatch(getStatus(userId as number))
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [])

    return (
        <div>
            <Profile isOwner={!props.match.params.userId}
            />
        </div>
    )
}

export default compose<React.ComponentType>(withRouter)(ProfilePage)