import React, { useState } from 'react'
import contactsService from './contactsService'
import ContactInputForm from './ContactInputForm'
//MUI
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
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

export default function AddContact({ update }) {
    const [isValid, setIsValid] = useState(false);
    const [submit, setSubmit] = useState()

    const classes = useStyles();

    const handleClick = () => {
        /*if (!isValid) return;
        contactsService.addContact(contact).then(res =>
            update()
        )*/
        setSubmit(submit => !submit)
    }

    return (
        <Paper elevation={3} className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off">
                <ContactInputForm 
                    submit={submit} 
                    postContact={contactsService.addContact}
                    update={update}
                />
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
