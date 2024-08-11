import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ForgotPassword from "./components/auth/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import UpdateProfile from "./components/auth/UpdateProfile";
import CenteredContainer from "./components/CenteredContainer.jsx";
function App() {
  return (
    <CenteredContainer>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Route>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </CenteredContainer>
  );
}

export default App;
