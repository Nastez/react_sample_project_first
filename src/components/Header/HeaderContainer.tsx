import React from 'react'
import Header, {DispatchStatePropsType, MapStatePropsType} from "./Header"
import {logout} from "../../redux/auth-reducer"
import {connect} from 'react-redux'
import {compose} from "redux"
import {AppStateType} from "../../redux/redux-store"

class HeaderContainer extends React.Component<MapStatePropsType & DispatchStatePropsType> {
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default compose(connect<MapStatePropsType, DispatchStatePropsType, {}, AppStateType>(mapStateToProps, {logout}))(HeaderContainer)