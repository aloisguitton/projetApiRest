import React, {Component, Fragment, useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom"
import {page_404} from "./Views/page_404"
import {Home} from "./Views/Home/Home";
import {Login} from "./Views/Login/Login";
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    props: state
})

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action)
        }
    }
}


const App = ({props}) => {
    const isAuth = props.authReducer.loggedIn
    const PrivateRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={(props) => (
            isAuth
                ? <Component {...props} />
                : <Redirect to='/connexion'/>
        )}/>
    )

    const IsNotConnect = ({component: Component, ...rest}) => (
        <Route {...rest} render={(props) => (
            !isAuth
                ? <Component {...props} />
                : <Redirect to='/'/>
        )}/>
    )

    const history = useHistory()

    useEffect(() => {
        return history.listen((location) => {
            window.scrollTo(0, 0)
        })
    }, [history])

    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/connexion' component={Login}/>
            <Route path="*" component={page_404} status={404}/>
        </Switch>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)