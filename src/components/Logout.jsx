// import React, { useEffect } from 'react';
import React, { useEffect,useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../App';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  // const notify = () => toast.success("Logout successfully");
  const notify = () => toast.success('Logout Successfully', {style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
});

  useEffect(() => {
    method: 'GET',
    // fetch('/logout', {
    fetch('/api/logout', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        

        // Add a delay before navigating
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 4000); // Adjust the delay time as needed
        if(res.status===200){
          notify();
          console.log("logout Successfully")
        }
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
          
        }
        dispatch({type:"USER",payload:''});
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
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </>
  );
};

export default Logout;
