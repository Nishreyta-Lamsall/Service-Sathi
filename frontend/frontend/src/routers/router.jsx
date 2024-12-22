import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import VerifyAccount from "../components/VerifyAccount";
import HomePage from "../pages/HomePage";
import Login from "../pages/login";
import ForgetPassword from "../components/ForgetPassword";
import ResetPassword from "../components/ResetPassword";
import AboutUs from "../pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutUs/>},
      { path: "/contact", element: <h1>Contact Us</h1> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/verifyaccount", element: <VerifyAccount /> },
      { path: "/forgetpassword", element: <ForgetPassword /> },
      { path: "/resetpassword", element: <ResetPassword/> },
    ],
  },
]);

export default router;
