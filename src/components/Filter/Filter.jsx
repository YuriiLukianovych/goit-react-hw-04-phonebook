import React from 'react';
import css from './Filter.module.scss';

function Filter({ filter, onFilterSearch, clearFilter, disabled }) {
  return (
    <div className={css.formRow}>
      <label htmlFor="filter">Find contact by name:</label>
      <input
        className={`input ${css.filterInput}`}
        id="filter"
        name="filter"
        type="text"
        value={filter}
        disabled={disabled}
        onChange={e => onFilterSearch(e)}
      />
      {filter && (
        <button className={css.clearBtn} type="button" onClick={clearFilter}>
          Clear
        </button>
      )}
    </div>
  );
}

export default Filter;
