import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Agencies from "./pages/Agencies";
import Disasters from "./pages/Disasters";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import Login from "./pages/Auth/Login";
import ChangePassword from "./pages/Auth/ChangePassword";
import SignUp from "./pages/Auth/SignUp";
import Contact from "./pages/Contact";
import { useDispatch, useSelector } from "react-redux";
import { AuthTypes } from "./redux/action_types";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UpdateProfile from "./pages/UpdateProfile";
import AgencyProfile from "./pages/AgencyProfile";
import AddDisaster from "./components/AddDisaster";
import DisasterDetails from "./components/DisasterDetails";
import UpdateDisaster from "./pages/UpdateDisaster";
import AddResources from "./components/AddResource";
import { getAccountInfo } from "./redux/Actions/profileAction";
import Alert from "./pages/Alert";
import CreateAlert from "./components/CreateAlert";
import UpdateResource from "./pages/UpdateResource";
import ResourceDetails from "./components/ResourceDetails"

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedin);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const dispatch = useDispatch();

  // Check if there's a token in sessionStorage and dispatch LOGIN_SUCCESS if found
  React.useEffect(() => {
    const token = sessionStorage.getItem("_token");
    if (token) {
      dispatch({
        type: AuthTypes.LOGIN_SUCCESS,
        payload: token,
      });
      dispatch(getAccountInfo());
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/disaster/:disasterId"
          element={
            <PrivateRoute>
              <DisasterDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/agencies"
          element={
            <PrivateRoute>
              <Agencies />
            </PrivateRoute>
          }
        />
        <Route
          path="/agency-profile/:id"
          element={
            <PrivateRoute>
              <AgencyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/disasters"
          element={
            <PrivateRoute>
              <Disasters />
            </PrivateRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <Resources />
            </PrivateRoute>
          }
        />
        {/* <Route path="/about" element={<AboutUs />} />{" "} */}
        {/* This is now an open route */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/updateResource/:resourceId" element={<UpdateResource />} />
        <Route path="/resource/:resourceId" element={<ResourceDetails/>} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/addDisaster"
          element={
            <PrivateRoute>
              <AddDisaster />
            </PrivateRoute>
          }
        />
        <Route
          path="/disaster/:disasterId/update"
          element={
            <PrivateRoute>
              <UpdateDisaster />
            </PrivateRoute>
          }
        />
        <Route
          path="/addResource"
          element={
            <PrivateRoute>
              <AddResources />
            </PrivateRoute>
          }
        />
        <Route
          path="/alert"
          element={
            <PrivateRoute>
              <Alert />
            </PrivateRoute>
          }
        />
        <Route
          path="/createAlert"
          element={
            <PrivateRoute>
              <CreateAlert />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
