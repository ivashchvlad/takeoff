import React, { useState } from 'react'
import contactsService from './contactsService'
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
    input: {
        margin: '5px 0 5px 0',
        width: '100%',
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
}));

export default function AddContact({ update }) {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [organization, setOrganization] = useState('')
    const [organizationError, setOrganizationError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')

    const classes = useStyles();

    const handleClick = () => {
        if (!validate()) return;
        contactsService.addContact({ name, organization, phoneNumber }).then(res =>
            update()
        )
        setName('')
        setOrganization('')
        setPhoneNumber('')
    }

    const validate = () => {
        let valid = true;
        if (!name) {
            setNameError("Name can't be empty")
            valid = false
        } else if (name.length > 20) {
            setNameError("Name should be less than 20 ch.")
            valid = false
        }else setNameError('')

        if (!organization) {
            setOrganizationError("Organization can't be empty")
            valid = false
        } else if (organization.length > 20) {
            setOrganizationError("Org. should be less than 20 ch.")
            valid = false
        } else setOrganizationError('')

        if (!phoneNumber) {
            setPhoneNumberError("Phone nuber can't be empty")
            valid = false
        } else if (phoneNumber.length > 10) {
            setPhoneNumberError("PhoneNumber be less than 10 ch.")
            valid = false
        } else setPhoneNumberError('')
        return valid
    }

    return (
        <Paper elevation={3} className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField id="name" label="Name" className={classes.input}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField id="organization" label="Organization" className={classes.input}
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    error={!!organizationError}
                    helperText={organizationError}
                />
                <TextField id="phoneNumber" label="Phone Number" className={classes.input}
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    error={!!phoneNumberError}
                    helperText={phoneNumberError}
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
