import axios from 'axios'
import auth from './auth'

const API_URL = "http://localhost:3001/contacts/"

class ContactsService {
    getContacts() {
        return axios.get(API_URL)
            .then(res => res.data)
            .catch(e => console.log(e));
    }

    addContact(contact) {
        return axios.post(API_URL, {...contact, userId: auth.getJWT().sub})
            .then(res => res.data)
            .catch(e => console.log(e));
    }

    updateContact(contact) {
        return axios.put(API_URL+contact.id, {...contact, userId: auth.getJWT().sub})
            .then(res => res.data)
            .catch(e => console.log(e));
    }

    deleteContact(contactId) {
        return axios.delete(API_URL + contactId)
            .then(res => res.status)
            .catch(e => console.log(e));
    }
}

export default new ContactsService()