import React, { useState } from "react";

const AbsentMeter = ({ percentage }) => {
  const [meterColor, setMeterColor] = useState("#00ff00"); // Default color: green
  const [meterWidth, setMeterWidth] = useState(200); // Default width: 200px

  // Function to update color and width based on percentage
  const updateMeterStyle = (percentage) => {
    if (percentage >= 0 && percentage <= 100) {
      // Adjust color based on percentage
      setMeterColor(percentage < 50 ? " #00ff00" : "#ff0000");

      // Adjust width based on percentage
      setMeterWidth((percentage / 100) * 200); // Adjust maximum width as needed
    }
  };

  // Update meter style on component mount and when the percentage prop changes
  React.useEffect(() => {
    updateMeterStyle(percentage);
  }, [percentage]);

  return (
    <div className="overflowdiv">
        <p className="poabsolute">{percentage}</p>
      <div className="meter-container">
        <div
          className="meter"
          style={{ backgroundColor: meterColor, width: `${meterWidth}px` }}
        />
      </div>
    </div>
  );
};

export default AbsentMeter;
