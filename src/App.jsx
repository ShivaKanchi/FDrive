import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import ForgotPassword from "./components/auth/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import Profile from "./components/Profile.jsx";
import UpdateProfile from "./components/auth/UpdateProfile";
import Dashboard from "./components/drive/Dashboard.jsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Drive */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/folder/:folderId" element={<Dashboard />} />

          <Route path="/user" element={<PrivateRoute />}>
            {/* Profile */}
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/update-profile" element={<UpdateProfile />} />
          </Route>

          {/* Auth */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
