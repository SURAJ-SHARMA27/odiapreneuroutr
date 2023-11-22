import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  // const notify = () => toast.success("Logout successfully");
  const notify = () => toast.success('Logout Successfully');

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
