import React from 'react';

const InputField = ({ label, value, placeholder, onChange, type, error, disabled }) => {
  const inputId = label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className='input_item'>
      <label htmlFor={inputId} className='mb-2' key={inputId}>
        {label} <span className='input_star'></span>
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        placeholder={placeholder}
        className='form-control'
      />
      {error && <p className="input_error">{error}</p>}
    </div>
  );
};

export default InputField;
