import React, { useState, useEffect } from 'react'
import contactsService from './contactsService'
import AddContact from './AddContact'
import Contact from './Contact'

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    contacts: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 50,
    },
    search: {
        width: 345,
        marginBottom: 20,
    }
}));

export default function Contacts() {
    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        update();
    }, [])

    const classes = useStyles();

    const update = () => {
        contactsService.getContacts().then(res => setContacts(res))
    }

    const searchFilter = (contact) => {
        if(search) {    
            if(contact.name.includes(search) ||
                contact.organization.includes(search) ||
                contact.phoneNumber.includes(search)
            ) return true
            else return false
        } else return true;
    }

    return (
        <div className={classes.contacts}>
            <TextField id="outlined-search" label="Search field" type="search"
                className={classes.search} 
                variant="outlined" 
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {!!contacts.length && contacts.filter(searchFilter).map(contact => (
                <Contact contact={contact} update={update} key={contact.id}/>
            ))}
            <AddContact update={update} />
        </div>
    )
}
