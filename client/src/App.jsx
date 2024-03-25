import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

const App = () => {
  return (
    <Router>
      <div>
        <Routes> 
          <Route exact path="/" element={<Home/>}/>
          <Route path="/register" element={<Registration />} /> 
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
