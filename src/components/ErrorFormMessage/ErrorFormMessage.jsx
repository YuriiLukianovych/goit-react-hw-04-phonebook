import React from 'react';
import css from './ErrorFormMessage.module.scss';

function ErrorFormMessage({ children }) {
  return <div className={css.errorBox}>{children}</div>;
}

export default ErrorFormMessage;
