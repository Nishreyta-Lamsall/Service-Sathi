import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner"; // Import toast for notifications

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread the existing form data
      [name]: value, // Update the specific field
    });
  };

  const validateForm = () => {
    let formErrors = {
      email: "",
      password: "",
    };
    let isValid = true;

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email) {
      toast.error("Please enter email"); // Show toast error for email
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address"); // Show toast error for invalid email
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      toast.error("Please enter password"); // Show toast error for password
      isValid = false;
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long"); // Show toast error for short password
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before proceeding
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies and credentials
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Parse the response JSON

      if (response.status === 403) {
        // If the user is not verified, show an error and redirect after delay
        toast.error(data.message); // Notify the user
        setTimeout(() => {
          navigate("/verifyaccount"); // Redirect to the verification page
        }, 2000); // 2-second delay
        return;
      }

      if (!response.ok) {
        // Handle other errors
        const errorMessage = data.message || "Login failed. Please try again.";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Successful login
      toast.success(data.message); // Show success message
      localStorage.setItem("loginMessage", data.message); // Store login message
      localStorage.setItem("token", data.token); // Store token
      localStorage.setItem("user", JSON.stringify(data.data.user)); // Store user data

      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error:", error.message);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center mt-14">
      <div className="border font-primary border-gray-500 h-[30rem] w-[40rem] flex">
        {/* First child div */}
        <div className="flex-1 bg-[#0A1F44] text-white text-5xl flex flex-col items-center justify-center">
          {/* Text Section */}
          <div className="flex-grow flex items-center justify-center">
            <p className="text-[2rem] -mt-20">
              Welcome <br />
              <span className="inline-block mt-3">to Service Sathi</span>
            </p>
          </div>
        </div>
        {/* Second child div */}
        <div className="flex-1 border">
          <div className="text-center mt-8">
            <p className="text-3xl font-medium">Login</p>
          </div>
          <div className="text-sm ml-10 mt-5 text-slate-900">
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <label htmlFor="email" className="block mt-16">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-1 w-60 mt-2 text-gray-800 border border-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              {/* Password */}
              <label htmlFor="password" className="block mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-3 py-1 w-60 mt-2 border text-gray-800 border-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <Link
                to="/forgetpassword"
                className="text-red-500 block text-xs ml-[8.8rem] font-medium mt-4 underline"
              >
                Forget Password
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-1 mt-10 ml-20 border bg-[#2D64C5] rounded-3xl text-white"
              >
                {loading ? "Submitting..." : "Login"}
              </button>
            </form>
            <div className="mt-10 ml-5">
              <p className="text-gray-900">
                Don't have an account?
                {" "}
                <Link
                  to="/register"
                  className="text-[#2D64C5] underline cursor-pointer hover:text-blue-800"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add the Toaster component for notifications */}
      <Toaster />
    </div>
  );
};

export default Login;
