import React, { useEffect } from 'react';
import '../components/stylecss/Timer.css';

const Timer = () => {
  useEffect(() => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    // Set the countdown to 12 days from now
    const countdownDays = 12;

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const today = new Date();
      const next12Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() + countdownDays);
      const countDown = next12Days.getTime();

      return countDown - now;
    };

    const updateCountdown = () => {
      const distance = calculateCountdown();

      document.getElementById("days").innerText = Math.floor(distance / day);
      document.getElementById("hours").innerText = Math.floor((distance % day) / hour);
      document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute);
      document.getElementById("seconds").innerText = Math.floor((distance % minute) / second);

      if (distance < 0) {
        document.getElementById("headline").innerText = "It's my birthday!";
        document.getElementById("countdown").style.display = "none";
        document.getElementById("content").style.display = "block";
        clearInterval(intervalId);
      }
    };

    // Initial setup
    updateCountdown();

    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  return (
    <div style={{ color: 'white', margin: "20px", marginBottom: "100px" }}>
      <div className="custom-container">
        <h1 style={{ fontSize: "25px", color: "#828282" }} className="custom-heading">Registration will end in:</h1>
        <div id="countdown" style={{ color: "#828282" }}>
          <ul className="timer-list">
            <li className="timer-list-item"><span id="days" className="timer-label"></span>days</li>
            <li className="timer-list-item"><span id="hours" className="timer-label"></span>Hours</li>
            <li className="timer-list-item"><span id="minutes" className="timer-label"></span>Minutes</li>
            <li className="timer-list-item"><span id="seconds" className="timer-label"></span>Seconds</li>
          </ul>
        </div>
        <div id="content" className="emoji">
          <span>🥳</span>
          <span>🎉</span>
          <span>🎂</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
