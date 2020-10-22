import React, { useState } from 'react'
import contactsService from './contactsService'
//MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles({
    contact: {
        width: 345,
        marginBottom: 20
    }
});

export default function Contact({ contact, update }) {
    const [changeMode, setChangeMode] = useState(false)
    const [name, setName] = useState(contact.name)
    const [organization, setOrganization] = useState(contact.organization)
    const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber)

    const classes = useStyles();

    const handleChange = () => {
        if(changeMode) {
            contactsService.updateContact({id: contact.id, name, organization, phoneNumber})
            .then(res => update())
            setChangeMode(false)
        } else setChangeMode(true);
    }

    return (
        <Card className={classes.contact} key={contact.id}>
            <CardHeader
                avatar={
                    <Avatar aria-label="contact" className={classes.avatar} color="primary">
                        {contact.name[0]}
                    </Avatar>
                }
                title={contact.name}
                subheader={contact.organization}
            />
            <CardContent>
                {
                    changeMode ? (<>
                        <TextField id="change-name" label="Name" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                        <TextField id="change-organization" label="Organization" 
                            value={organization}
                            onChange={e => setOrganization(e.target.value)} 
                        />
                        <TextField id="change-phoneNumber" label="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </>) : (
                            <Typography variant="h5" color="textPrimary" component="h5">
                                {contact.phoneNumber}
                            </Typography>
                        )
                }
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    color="secondary"
                    onClick={() => {
                        contactsService.deleteContact(contact.id).then(res => update())
                    }}
                >
                    <DeleteIcon />
                    delete
                </Button>
                <Button 
                    size="small" 
                    color="primary" 
                    onClick={handleChange}
                >
                    <EditIcon />
                    { changeMode? "save changes" : "change"}
                </Button>
            </CardActions>
        </Card>
    )
}
