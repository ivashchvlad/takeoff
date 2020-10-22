import React from 'react'
import auth from './auth'
//MUI staff
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useHistory } from "react-router-dom"

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

function Navbar() {
    const classes = useStyles({});
    const history = useHistory();

    const handleGoBack = (e) => {
        e.preventDefault();
        history.goBack();
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!auth.isLoggedIn()) {
            auth.logout(); 
            history.push('/');
        } else history.push('/login');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleGoBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        TakeOff

                    </Typography>
                    <Button color="inherit" onClick={handleLogin}>{auth.isLoggedIn() ? 'Logout' : 'Login'}</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
