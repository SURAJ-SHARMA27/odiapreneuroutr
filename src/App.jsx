// app.jsx
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from "./components/RegistrationForm";
import Home from "./components/Home";

const App = () => (
  <div>
    <Routes>
      <Route path="/aboutus" element={<RegistrationForm />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
);

export default App;
