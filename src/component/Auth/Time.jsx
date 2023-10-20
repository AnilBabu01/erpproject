import React, { useState, useEffect } from "react";

function Time({timestatus,}) {
  const [time, settime] = useState(60);
  const stoptimer = () => {
    settimestatus(false);
    setgetphoneotpstate(false);
    setgetphonebtnstatus(false);
    settime(60);
  };

  const starttimer = () => {
    settimestatus(true);
    if (timestatus) {
      if (time > 0) {
        setTimeout(() => {
          settime(time - 1);
        }, 1000);
      } else {
        stoptimer();
      }
    }
  };

  useEffect(() => {
    starttimer();
  }, [time]);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}

export default Time;
