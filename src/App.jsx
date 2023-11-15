// app.jsx
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from "./components/RegistrationForm";
import Home from "./components/Home";
import Registeredteams from './components/Registeredteams';
import Logout from './components/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div>
    <Routes>
      <Route path="/about" element={<RegistrationForm />} />
      <Route path="/registeredteams" element={<Registeredteams/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/" element={<Home />} />

    </Routes>
    <ToastContainer />
  </div>
);

export default App;
