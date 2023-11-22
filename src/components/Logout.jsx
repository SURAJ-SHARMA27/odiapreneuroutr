import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  // const notify = () => toast.success("Logout successfully");

  useEffect(() => {
    fetch('/api/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        // notify(); // Use React Toastify instead of window.alert

        // Add a delay before navigating
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000); // Adjust the delay time as needed
 
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
        if(res.status===200){
          console.log("logout successfull");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <>
    <div className='glow'>
      Logout successfully
      
    </div>
   
    </>
  );
};

export default Logout;
