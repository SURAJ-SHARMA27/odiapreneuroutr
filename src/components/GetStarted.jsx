import React, { useState } from "react";
import RegistrationForm from './RegistrationForm';
import './MyButton.css';
import { arrowUp } from "../assets";

const GetStarted = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const openRegistrationForm = () => {
    setIsRegistrationOpen(true);
  };

  const closeRegistrationForm = () => {
    setIsRegistrationOpen(false);
  };

  return (
    <div>
    <button onClick={openRegistrationForm} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">Register Now</button>
    <RegistrationForm isOpen={isRegistrationOpen} onClose={closeRegistrationForm} />
  </div>
   
  );
};

export default GetStarted;
