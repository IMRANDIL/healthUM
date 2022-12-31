import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./Pages/ApplyDoctor";
import Notification from "./Pages/Notification";
import Users from "./Pages/Admin/Users";
import Doctors from "./Pages/Admin/Doctors";
import Profile from "./Pages/Doctor/Profile";
import BookAppointment from "./Pages/BookAppointment";
import Appointments from "./Pages/Appointments";
const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div className="appContainer">
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}

        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoutes>
                <Notification />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/doctor/profile/:userId"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/book-appointment/:doctorId"
            element={
              <ProtectedRoutes>
                <BookAppointment />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoutes>
                <Appointments />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoutes>
                <Appointments />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
