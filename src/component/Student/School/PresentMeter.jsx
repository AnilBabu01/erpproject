import React, { useState } from "react";

const PresentMeter = ({ percentage }) => {
  const [meterColor, setMeterColor] = useState("#00ff00"); // Default color: green
  const [meterWidth, setMeterWidth] = useState(200); // Default width: 200px

  // Function to update color and width based on percentage
  const updateMeterStyle = (percentage) => {
    if (percentage >= 0 && percentage <= 100) {
      // Adjust color based on percentage
      setMeterColor(percentage < 50 ? "#ff0000" : "#00ff00");

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
      <p className="poabsolute">{percentage>=0?percentage:"NONE"}</p>
      <div className="meter-container">
        <div
          className="meter"
          style={{ backgroundColor: meterColor, width: `${meterWidth}px` }}
        />
      </div>
    </div>
  );
};

export default PresentMeter;
