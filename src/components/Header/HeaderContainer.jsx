import React from 'react';
import Header from "./Header";
import {getAuthDataThunkCreator} from "../../redux/auth-reducer";
import {connect} from 'react-redux';
import {compose} from "redux";

class HeaderContainer extends React.Component {

    componentDidMount() {
       this.props.getAuthDataThunkCreator();
    }
    render() {
        return <Header {...this.props}/>
    }
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default compose(connect(mapStateToProps, {getAuthDataThunkCreator}))(HeaderContainer);