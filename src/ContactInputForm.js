import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    input: {
        margin: '5px 0 5px 0',
        width: '100%',
    }
}))

export default function ContactInputForm({ submit, postContact, update, contact }) {
    const [name, setName] = useState(contact? contact.name : '')
    const [nameError, setNameError] = useState('')
    const [organization, setOrganization] = useState(contact? contact.organization : '')
    const [organizationError, setOrganizationError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(contact? contact.phoneNumber :' ')
    const [phoneNumberError, setPhoneNumberError] = useState('')

    useEffect(() => {
        if(submit === undefined) return;
        validateName(name)
        validateOrganization(organization)
        validatePhoneNumber(phoneNumber)
        if(nameError && organizationError && phoneNumberError) return;
        postContact({name, organization, phoneNumber}).then(res =>
            update()
        )
        setName('')
        setOrganization('')
        setPhoneNumber('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submit])

    const classes = useStyles()

    const handleChange = (e) => {
        switch(e.target.name) {
            case 'name' : 
                setName(e.target.value)
                validateName(e.target.value)
                break;
            case 'organization' :
                setOrganization(e.target.value)
                validateOrganization(e.target.value)
                break;
            case 'phoneNumber' : 
                setPhoneNumber(e.target.value)
                validatePhoneNumber(e.target.value)
                break;
            default: 
            break;
        }
    }

    const validateName = (name) => {
        if (!name) {
            setNameError("Name can't be empty")
        } else if (name.length > 20) {
            setNameError("Name should be less than 20 ch.")
        }else setNameError('')
    }

    const validateOrganization = (organization) => {
        if (!organization) {
            setOrganizationError("Organization can't be empty")
        } else if (organization.length > 20) {
            setOrganizationError("Org. should be less than 20 ch.")
        } else setOrganizationError('')
    }

    const validatePhoneNumber = (phoneNumber) => {
        if (!phoneNumber) {
            setPhoneNumberError("Phone nuber can't be empty")
        } else if (phoneNumber.length > 10) {
            setPhoneNumberError("PhoneNumber be less than 10 ch.")
        } else setPhoneNumberError('')
    }

    return (
        <>
            <TextField id="name" label="Name" name="name"
                className={classes.input}
                value={name}
                onChange={handleChange}
                error={!!nameError}
                helperText={nameError}
            />
            <TextField id="organization" label="Organization" name="organization"
                className={classes.input}
                value={organization}
                onChange={handleChange}
                error={!!organizationError}
                helperText={organizationError}
            />
            <TextField id="phoneNumber" label="Phone Number" name="phoneNumber"
                className={classes.input}
                value={phoneNumber}
                onChange={handleChange}
                error={!!phoneNumberError}
                helperText={phoneNumberError}
            />
        </>
    )
}
