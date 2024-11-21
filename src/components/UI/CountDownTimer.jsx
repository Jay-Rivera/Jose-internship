import React, { useEffect, useState } from "react";

function CountDownTimer({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate));

  function calculateTimeLeft(expiryDate) {
    const countDownMilli = expiryDate - Date.now();
    const seconds = Math.floor((countDownMilli / 1000) % 60);
    const minutes = Math.floor((countDownMilli / 1000 / 60) % 60);
    const hours = Math.floor((countDownMilli / 1000 / 60 / 60) % 24);

    return {
      total: countDownMilli,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(expiryDate);
      setTimeLeft(updatedTimeLeft);

      if (updatedTimeLeft.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <>
      {timeLeft.total <= 0 ? (
        <div className="de_countdown">EXPIRED</div>
      ) : (
        <div className="de_countdown">
          {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      )}
    </>
  );
}

export default CountDownTimer;
