import React, { Component } from 'react';
import Widget from './components/Widget';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.scss';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  notify = contactName =>
    toast.error(`'${contactName}' is already in contacts.`, {
      duration: 3000,
      position: 'top-center',
      style: {
        backgroundColor: '#d14431',
        fontSize: '20px',
        color: 'white',
        fontWeight: '500',
      },
    });

  onSearchInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clearFilter = () => {
    this.setState({
      filter: '',
    });
  };

  addContact = contactData => {
    const duplicate = this.state.contacts.filter(
      el => el.name.toLowerCase() === contactData.name.toLowerCase()
    ).length;

    if (duplicate) {
      this.notify(contactData.name);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [contactData, ...prevState.contacts],
      };
    });
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filterValue = filter.toLowerCase();
    const visibleContacts = contacts.filter(item =>
      item.name.toLowerCase().includes(filterValue)
    );

    return (
      <div className={css.bodyWrapper}>
        <Widget title="Phonebook widget">
          <div className={css.phonebookWrapper}>
            <h2 className={css.title}>Phonebook</h2>
            <ContactForm addContact={this.addContact} />

            <h2 className={css.title}>Contacts</h2>
            <Filter
              onFilterSearch={this.onSearchInputChange}
              filter={filter}
              clearFilter={this.clearFilter}
              disabled={!contacts.length}
            />
            <ContactList
              contactList={visibleContacts}
              deleteContact={this.handleDeleteContact}
            />
            {!contacts.length && (
              <p style={{ color: '#6c0e0e', fontWeight: '500' }}>
                Contact List is empty
              </p>
            )}
            {!visibleContacts.length && filter && (
              <p style={{ color: '#6c0e0e', fontWeight: '500' }}>
                Nothing was found for your request
              </p>
            )}
          </div>
        </Widget>
        <Toaster />
      </div>
    );
  }
}
