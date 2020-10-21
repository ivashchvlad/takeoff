import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Page from './Page'
import Login from './Login'
import SignUp from './SignUp'
import Page404 from './Page404'
import Contacts from './Contacts'


function MainRouter() {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={Contacts} title='Main' />
            <Page path="/login" component={Login} title='Login' />
            <Page path="/signup" component={SignUp} title='Sign up' />
            <Page component={Page404} title='Not found' />
        </Switch>
    )
}

export default MainRouter
