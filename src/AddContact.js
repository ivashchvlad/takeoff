import React, { useState } from 'react'
import contactsService from './contactsService'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'

export default function AddContact({update}) {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [organization, setOrganization] = useState('')
    const [organizationError, setOrganizationError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')

    const handleClick = () => {
        if (!validate()) return;
        contactsService.addContact({name, organization, phoneNumber}).then(res =>
            update()
        )
        setName('')
        setOrganization('')
        setPhoneNumber('')
    }

    const validate = () => {
        let valid = true;
        if(!name) {
            setNameError("Name can't be empty") 
            valid = false
        } else setNameError('')
        if(!organization) {
            setOrganizationError("Organization can't be empty")
            valid = false
        } else setOrganizationError('')
        if(!phoneNumber) {
            setPhoneNumberError("Phone nuber can't be empty")
            valid = false
        } else setPhoneNumberError('')
        return valid
    }

    return (
        <form noValidate autoComplete="off">
            <TextField id="name" label="Name" 
                value={name} 
                onChange={e => setName(e.target.value)}
                error={nameError}
                helperText={nameError}
            />
            <TextField id="organization" label="Organization" 
                value={organization} 
                onChange={e => setOrganization(e.target.value)}
                error={organizationError}
                helperText={organizationError}
            />
            <TextField id="phoneNumber" label="Phone Number" 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)}
                error={phoneNumberError}
                helperText={phoneNumberError}
            />
            <Fab color="primary" aria-label="add" onClick={handleClick}>
                <AddIcon />
            </Fab>
        </form>
    )
}
