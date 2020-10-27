import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    input: {
        margin: '5px 0 5px 0',
        width: '100%',
    }
}))

export function withContactInputForm(Component) {
    function ContactInputForm(props) {
        const [name, setName] = useState(props.contact ? props.contact.name : '')
        const [nameError, setNameError] = useState('')
        const [organization, setOrganization] = useState(props.contact ? props.contact.organization : '')
        const [organizationError, setOrganizationError] = useState('')
        const [phoneNumber, setPhoneNumber] = useState(props.contact ? props.contact.phoneNumber : '')
        const [phoneNumberError, setPhoneNumberError] = useState('')

        const classes = useStyles()

        const submiting = (postContact) => {
            validateName(name)
            validateOrganization(organization)
            validatePhoneNumber(phoneNumber)
            if (nameError || organizationError || phoneNumberError) return false;
            postContact({
                name,
                organization,
                phoneNumber,
                id: props.contact ? props.contact.id : null,
            }).then(res => props.update())
            if (!props.contact) {
                setName('')
                setOrganization('')
                setPhoneNumber('')
            }
            return true
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }

        const handleChange = (e) => {
            switch (e.target.name) {
                case 'name':
                    setName(e.target.value)
                    validateName(e.target.value)
                    break;
                case 'organization':
                    setOrganization(e.target.value)
                    validateOrganization(e.target.value)
                    break;
                case 'phoneNumber':
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
            } else setNameError('')
        }

        const validateOrganization = (organization) => {
            if (!organization) {
                setOrganizationError("Organization can't be empty")
            } else if (organization.length > 30) {
                setOrganizationError("Org. should be less than 30 ch.")
            } else setOrganizationError('')
        }

        const validatePhoneNumber = (phoneNumber) => {
            if (!phoneNumber) {
                setPhoneNumberError("Phone nuber can't be empty")
            } else if (phoneNumber.length > 12) {
                setPhoneNumberError("PhoneNumber should be less than 11 ch.")
            } else setPhoneNumberError('')
        }

        return (
            <Component {...props}
                submit={submiting}
            >
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
            </Component>
        )
    }
    return ContactInputForm
}