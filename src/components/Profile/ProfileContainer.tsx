import React from 'react'
import Profile from './Profile'
import {connect, useDispatch, useSelector} from 'react-redux'
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {AppStateType} from '../../redux/redux-store'
import {ProfileType} from '../../types/types'

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type DispatchStatePropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapStatePropsType & DispatchStatePropsType & RouteComponentProps<PathParamsType>

const ProfilePage: React.FC = () => {
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const status = useSelector((state: AppStateType) => state.profilePage.status)

    const dispatch = useDispatch()

    const updateStatus = (status: string) => {
        dispatch(updateStatus(status))
    }


    return (
        <div>
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={profile}
                     status={status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        </div>
    )
}

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }

        }

        if (!userId) {
            console.error('ID should exists in URI params or in state(authorizedUserId)')
        } else {
            this.props.getProfile(userId as number)
            this.props.getStatus(userId as number)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }

    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<React.ComponentType>(connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
}), withRouter)(ProfileContainer)