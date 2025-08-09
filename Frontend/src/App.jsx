
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './Components/Login';
import Register from "./Components/Register";
import Home from './Components/Home';

import PasswordReset from './Components/Forget';
function App() {
  return (
    <div className="App">
 <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home />}/>
        <Route path='/emailsent'element={<PasswordReset/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
