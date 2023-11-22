import { useState, useEffect } from 'react';
import Widget from './components/Widget';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.scss';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const notify = contactName =>
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

  const onSearchInputChange = e => {
    setFilter(e.target.value);
  };

  const clearFilter = () => {
    setFilter('');
  };

  const addContact = contactData => {
    const duplicate = contacts.filter(
      el => el.name.toLowerCase() === contactData.name.toLowerCase()
    ).length;

    if (duplicate) {
      notify(contactData.name);
      return;
    }

    setContacts(s => [contactData, ...s]);
  };

  const handleDeleteContact = id => {
    setContacts(s => s.filter(contact => contact.id !== id));
  };

  const filterValue = filter.toLowerCase();

  const visibleContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(filterValue)
  );

  return (
    <div className={css.bodyWrapper}>
      <Widget title="Phonebook widget">
        <div className={css.phonebookWrapper}>
          <h2 className={css.title}>Phonebook</h2>
          <ContactForm addContact={addContact} />

          <h2 className={css.title}>Contacts</h2>
          <Filter
            onFilterSearch={onSearchInputChange}
            filter={filter}
            clearFilter={clearFilter}
            disabled={!contacts.length}
          />
          <ContactList
            contactList={visibleContacts}
            deleteContact={handleDeleteContact}
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

export default App;
