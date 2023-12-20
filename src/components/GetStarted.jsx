// GetStarted.js
import React from "react";
import { Link } from "react-router-dom";

import './MyButton.css';


const GetStarted = () => {
  return (
    <div className="containers">
      <Link to="/about">
        <span>
          Register Now
        </span>
      </Link>
    </div>
  );
};

export default GetStarted;
