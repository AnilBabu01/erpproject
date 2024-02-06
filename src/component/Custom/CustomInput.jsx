
import React from 'react';
import styles from './CustomInput.module.css';

const CustomInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className={styles.customInput}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomInput;
