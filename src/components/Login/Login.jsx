import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from '../common/FormsControls/FormsControls.module.scss';


const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Email' validate={[required]} name='email' component={Input}/>
            </div>
            <div>
                <Field placeholder='Password' validate={[required]} name='password' type='password' component={Input}/>
            </div>
            <div>
                <Field component={Input} name='rememberMe' type='checkbox'/> remember me
            </div>
            { props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe); // Здесь под тем же именем не ThunkCreator, а какой-то коллбэкб который внутри себя диспатчит вызов ThunkCreator
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login); // Здесь логин - это ThunkCreator




