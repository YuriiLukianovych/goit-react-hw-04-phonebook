import React from 'react';
import ContactItem from 'components/ContactItem';
import css from './ContactList.module.scss';

function ContactList({ contactList, deleteContact }) {
  if (!contactList.length) {
    return;
  }
  return (
    <div className="boxWrapper">
      <ul className={`${css.contactList} list`}>
        {contactList.map(contact => {
          return (
            <ContactItem
              key={contact.id}
              contactItem={contact}
              deleteContact={deleteContact}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ContactList;
