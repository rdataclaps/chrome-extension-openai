import React, { useState } from 'react';

const TermsAndConditionsCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label htmlFor="terms" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          id="terms"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ marginRight: '8px' }}
        />
        <span style={{ fontSize: '14px' }}>
          I agree to the terms and conditions
        </span>
      </label>
    </div>
  );
};

export default TermsAndConditionsCheckbox;
