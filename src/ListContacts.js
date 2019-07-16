import React, { Component } from "react";
import PropType from 'prop-types'
import {Link} from 'react-router-dom'


class ListContacts extends Component {
    static propTypes = {
        contacts: PropType.array.isRequired,
        onDeleteContact: PropType.func.isRequired,
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    cleanQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query } = this.state;
        const { contacts, onDeleteContact } = this.props;

        const showingContacts = query === ''
            ? contacts
            : contacts.filter(cont => (cont.name.toLowerCase().includes(query.toLowerCase())))

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={query}
                        onChange={event => this.updateQuery(event.target.value)} />
                    <Link
                        to='/create'
                        className='add-contact'>Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>New showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={this.cleanQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map(contact => (
                        <li key={contact.id} className='contact-list-item'>
                            <div
                                className='contact-avatar'
                                style={{ backgroundImage: `url(${contact.avatarURL})` }}
                            ></div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button
                                onClick={() => onDeleteContact(contact)}
                                className='contact-remove'
                            >Remove</button>

                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}



export default ListContacts;