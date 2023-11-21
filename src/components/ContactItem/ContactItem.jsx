import React from 'react';
import { MdDelete } from 'react-icons/md';
import css from './ContactItem.module.scss';

function ContactItem({ contactItem, deleteContact }) {
  const { id, name, number } = contactItem;
  return (
    <li className={css.contactItem}>
      <span>
        {name}: {number}
      </span>
      <button
        className={css.deleteBtn}
        type="button"
        onClick={() => deleteContact(id)}
      >
        <MdDelete className={css.icon} />
      </button>
    </li>
  );
}

export default ContactItem;
