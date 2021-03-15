import './App.scss'
import React from 'react'
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import Sidebar from './components/Sidebar/Sidebar'
import HeaderContainer from './components/Header/HeaderContainer'
import {Login} from './components/Login/Login'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store, {AppStateType} from './redux/redux-store'
import {withSuspense} from './hoc/withSuspense'
import {UsersPage} from './components/Users/UsersContainer'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)


class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    catchAllUnhandledErrors = (event: PromiseRejectionEvent | Event) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandlerejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandlerejection', this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Sidebar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/profile'/>}/>
                        <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                        <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/users' render={() => <UsersPage pageTitle={'Samurai'}/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJsApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJsApp
