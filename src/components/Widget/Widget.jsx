import React from 'react';
import css from './Widget.module.scss';

const Widget = ({ title, children }) => {
  return (
    <div className={css.widget}>
      <h2 className={css.widget__title}>{title}</h2>
      <div className={css.widget__contentWrapper}>
        <div className={css.widget__content}>{children}</div>
      </div>
    </div>
  );
};

export default Widget;
