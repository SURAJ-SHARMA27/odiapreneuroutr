import React, { useEffect, useState } from 'react';
import '../components/stylecss/Timer.css';

const Timer = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const targetDate = new Date(2023, 11, 11, 0, 0, 0).getTime(); // December is 11 (0-indexed)
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: distance < 0,
      };
    };

    const updateCountdown = () => {
      const countdownValues = calculateCountdown();
      setCountdown(countdownValues);

      if (countdownValues.isExpired) {
        clearInterval(intervalId);
      }
    };

    // Initial setup
    updateCountdown();

    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ color: 'white', margin: '20px', marginBottom: '100px' }}>
      <div className="custom-container">
        <h1 style={{ fontSize: '25px', color: '#828282' }} className="custom-heading">
          Registration will end in:
        </h1>
        <div id="countdown" style={{ color: '#828282' }}>
          <ul className="timer-list">
            <li className="timer-list-item">
              <span id="days" className="timer-label">
                {countdown.days}
              </span>
              days
            </li>
            <li className="timer-list-item">
              <span id="hours" className="timer-label">
                {countdown.hours}
              </span>
              Hours
            </li>
            <li className="timer-list-item">
              <span id="minutes" className="timer-label">
                {countdown.minutes}
              </span>
              Minutes
            </li>
            <li className="timer-list-item">
              <span id="seconds" className="timer-label">
                {countdown.seconds}
              </span>
              Seconds
            </li>
          </ul>
        </div>
        <div id="content" className="emoji">
          {countdown.isExpired && <span>🥳🎉🎂</span>}
        </div>
      </div>
    </div>
  );
};

export default Timer;
