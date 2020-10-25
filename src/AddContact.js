import React, { useState } from 'react'
import contactsService from './contactsService'
import { withContactInputForm } from './ContactInputForm'
//MUI
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'fixed',
        zIndex: 10,
        bottom: 50,
        right: 50,
    },
    form: {
        position: 'reletive',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: 250,
        maxHeight: 290,
        padding: 10,
        paddingBottom: 80
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
}));

function AddContact({ update, children, submit }) {
    const classes = useStyles();

    const handleClick = () => {
        submit(contactsService.addContact)
    }

    return (
        <Paper elevation={3} className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off">
                {children}
                <Fab color="primary"
                    className={classes.fab}
                    aria-label="add"
                    onClick={handleClick}
                >
                    <AddIcon />
                </Fab>
            </form>
        </Paper>
    )
}

export default withContactInputForm(AddContact)
