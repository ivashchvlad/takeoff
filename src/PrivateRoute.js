import React from 'react'
import { Redirect } from 'react-router-dom'
import Page from './Page';
import auth from './auth'

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Page 
            {...rest}
            render={props => auth.isLoggedIn()? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )}
        />
    )
}

export default PrivateRoute
