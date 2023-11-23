// app.jsx
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from "./components/RegistrationForm";
import Home from "./components/Home";
import Registeredteams from './components/Registeredteams';
import Logout from './components/Logout';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoDashboard from './components/DoDashboard';
import SoDashboard from './components/SoDashboard';
import Updateapproval from './components/Updateapproval';
import { createContext, useState,useReducer } from 'react';
import { intialState,reducer } from './reducer/useReducer';

export const UserContext=createContext();
const App = () =>{
  const [state, dispatch] = useReducer(reducer,intialState);
return(
<UserContext.Provider value={{state,dispatch}}>
  <div>
    <Routes>
     <Route path="/about" element={<RegistrationForm />} />
     <Route path="/registeredteams" element={<Registeredteams/>}/>
         <Route path="/search" element={<DoDashboard/>}/>
     <Route path="/search_so" element={<SoDashboard/>}/>
      <Route path="/updateapproval" element={<Updateapproval/>}/>
     <Route path="/logout" element={<Logout/>}/> 
      <Route path="/" element={<Home />} />
   </Routes>
   {/* <ToastContainer />  */}
 </div>
 </UserContext.Provider>

);
};

export default App;