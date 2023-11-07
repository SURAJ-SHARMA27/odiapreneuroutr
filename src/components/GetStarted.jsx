import React, { useState } from "react";

import './MyButton.css';
import { arrowUp } from "../assets";

const GetStarted = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Define the CSS styles



  

  // Return your component with the styles and event handlers
  return (
    <body>
      <div className="container">
      <a href="#">
        <span>
        Register Now
        </span>
      </a>
      </div>
      </body>
   
  );
};

export default GetStarted;
