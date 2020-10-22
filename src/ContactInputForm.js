import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

export default function ContactInputForm() {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [organization, setOrganization] = useState('')
    const [organizationError, setOrganizationError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')

    const handleChange = (e) => {
        switch(e.target.name) {
            case 'name' : 
                setName(e.target.value)
                break;
            case 'organization' :
                setOrganization(e.target.value)
                break;
            case 'phoneNumber' : 
                setPhoneNumber(e.target.value)
                break;
            default: 
            break;
        }
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
        <>
            <TextField id="name" label="Name" name="name"
                value={name}
                onChange={handleChange}
                error={!!nameError}
                helperText={nameError}
            />
            <TextField id="organization" label="Organization" name="organization"
                value={organization}
                onChange={handleChange}
                error={!!organizationError}
                helperText={organizationError}
            />
            <TextField id="phoneNumber" label="Phone Number" name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                error={!!phoneNumberError}
                helperText={phoneNumberError}
            />
        </>
    )
}
