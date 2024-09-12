import React from "react";
import LandingPage from "./pages/Landingpage.jsx";
import GetStarted from "./pages/GetStarted.jsx";
// import RegistrationForm from "./pages/RegistrationForm.jsx"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import StudentReg from "./pages/StudentReg.jsx";
import AlumniReg from "./pages/AlumniReg.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={ <LandingPage />}
          />
          <Route
            path="/getstarted"
            element={ <GetStarted />}
          />
          <Route
            path="/stusignup"
            element={ <StudentReg />}
          />
          <Route
            path="/alusignup"
            element={ <AlumniReg />}
          />
        </Routes>
      </Router>
      {/* <h1>Helloo</h1> */}
    </div>
  );
};

export default App;
