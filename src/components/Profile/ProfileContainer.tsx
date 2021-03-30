import React, {useEffect} from 'react'
import Profile from './Profile'
import {useDispatch, useSelector} from 'react-redux'
import {getProfile, getStatus} from '../../redux/profile-reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {getUserId} from '../../redux/auth-selectors'

//type MapStatePropsType = ReturnType<typeof mapStateToProps>

type DispatchStatePropsType = {
   /* getProfile: (userId: number) => void
    getStatus: (userId: number) => void

    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>*/
}

type PathParamsType = {
    userId: string
}

type PropsType = DispatchStatePropsType & RouteComponentProps<PathParamsType>

const ProfilePage: React.FC<PropsType> = (props) => {

    const authorizedUserId = useSelector(getUserId)
    //const isAuth = useSelector(getIsAuth)

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

/*class ProfileContainer extends React.Component<PropsType> {

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
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}*/

/*let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})*/

export default compose<React.ComponentType>(withRouter)(ProfilePage)