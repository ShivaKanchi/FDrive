import { Container } from "react-bootstrap";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ForgotPassword from "./components/auth/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import UpdateProfile from "./components/auth/UpdateProfile";
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
