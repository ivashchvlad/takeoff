import React, { useState, useEffect } from 'react'
import contactsService from './contactsService'
import { withContactInputForm } from './ContactInputForm'
//MUI
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles({
    contact: {
        width: 345,
        marginBottom: 20
    }
});

function Contact({ contact, update, children, submit }) {
    const [changeMode, setChangeMode] = useState(false)

    const classes = useStyles();

    const handleChange = () => {
        if(changeMode) {
            if(submit(contactsService.updateContact)) { setChangeMode(false); }
        } else { 
            setChangeMode(true)
        };
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
                    changeMode ? (
                        children
                    ) : (
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
                        contactsService.deleteContact(contact.id)
                            .then(res => update())
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
                    { changeMode ? "save changes" : "change"}
                </Button>
            </CardActions>
        </Card>
    )
}

export default withContactInputForm(Contact)