import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  // Hide the footer for login and register pages
  const hideFooter = [
    "/login",
    "/register",
    "/resetpassword",
    "/verifyaccount",
    "/forgetpassword",
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* Main content area */}
      <main>
        <Outlet />
      </main>
      {/* Conditionally render the footer based on current path */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
