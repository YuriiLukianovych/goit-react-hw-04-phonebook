import React, { Component } from 'react';
import ErrorFormMessage from 'components/ErrorFormMessage';
import css from './ContactForm.module.scss';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const nameRegExp =
  /^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegExp, 'Name is not valid')
    .max(20)
    .required(),
  // number: yup.number().positive().integer().required(),
  number: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .max(12)
    .required(),
});

const initialValues = {
  name: '',
  number: '',
};

export default class ContactForm extends Component {
  handleSubmit = (values, actions) => {
    const { name, number } = values;
    const contactData = {
      id: nanoid(),
      name,
      number,
    };
    this.props.addContact(contactData);
    actions.resetForm();
  };

  render() {
    return (
      <div className="boxWrapper">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          <Form autoComplete="false">
            <div className={css.formRow}>
              <label htmlFor="name">Name:</label>
              <Field
                className={`input ${this.error && 'error'}`}
                type="text"
                id="name"
                name="name"
              />
              <ErrorMessage name="name" component={ErrorFormMessage} />
            </div>
            <div className={css.formRow}>
              <label htmlFor="number">Number:</label>
              <Field
                className={`input ${this.error && 'error'}`}
                type="tel"
                id="number"
                name="number"
              />
              <ErrorMessage name="number" component={ErrorFormMessage} />
            </div>
            <div className={css.formRow + ' ' + css.btnWrapper}>
              <button className={css.btn} type="submit">
                Add contact
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}
