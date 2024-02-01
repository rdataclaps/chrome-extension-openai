import React, { useState } from 'react';
import TimezoneSelect from 'react-timezone-select';

function TimeZoneSelector() {
  const [selectedTimezone, setSelectedTimezone] = useState('');

  const handleTimezoneChange = (timezone) => {
    setSelectedTimezone(timezone);
  };

  return (
    <div>
      <TimezoneSelect
        value={selectedTimezone}
        onChange={handleTimezoneChange}
        className="selector"
      />
    </div>
  );
}

export default TimeZoneSelector;
