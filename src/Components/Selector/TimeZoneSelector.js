import React, { useState } from 'react';
import Select from 'react-select';

const TimeZoneSelector = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState(null);

  const timeZoneOptions = [
    { label: 'GMT -12:00', value: 'Etc/GMT+12' },
    { label: 'GMT -11:00', value: 'Etc/GMT+11' },
    // Add more time zone options here
  ];

  const handleTimeZoneChange = (selectedOption) => {
    setSelectedTimeZone(selectedOption);
    // You can perform actions based on the selected time zone here
  };

  return (
    <div>
      <h2>Time Zone Selector</h2>
      <Select
        value={selectedTimeZone}
        onChange={handleTimeZoneChange}
        options={timeZoneOptions}
        placeholder="Select a time zone..."
      />
      {selectedTimeZone && (
        <p>Selected Time Zone: {selectedTimeZone.label}</p>
      )}
    </div>
  );
};

export default TimeZoneSelector;
