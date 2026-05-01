import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Layout from './layout.jsx';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
import ManagerDashboard from './screens/ManagerDashboard';
import './App.css'
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
    const accessToken = Cookies.get('authToken');
    return accessToken ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <PrivateRoute>
                <Layout /> 
              </PrivateRoute>
              }
          >
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manager" element={<ManagerDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
