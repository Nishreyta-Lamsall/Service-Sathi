import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams(); // Use the hook to get search parameters
  const email = searchParams.get("email"); // Get the 'email' query parameter

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async () => {
    let formErrors = {};

    // Validation checks and set error messages accordingly
    if (!otp) formErrors.otp = "No OTP";
    if (!password) formErrors.password = "No password";
    if (password && password.length < 6)
      formErrors.passwordLength = "Password should be 6 characters long";
    if (password !== confirmPassword)
      formErrors.passwordMatch = "Passwords do not match";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      const data = { email, otp, password, confirmPassword };
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/reset-password`,
        data,
        { withCredentials: true }
      );

      toast.success("Password reset successful.");
      navigate(`/login`); // Redirect to login page after successful reset
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col border border-gray-400 w-[50%] ml-96 mt-36 pb-16 pt-28 px-20">
      <input
        type="number"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="block w-[90%] mx-auto -mt-14 px-6 py-3 rounded-lg border-2 no-spinner outline-none"
      />
      {errors.otp && (
        <div className="text-red-500 text-sm mt-2">{errors.otp}</div>
      )}

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-[90%] mx-auto px-6 py-3 rounded-lg border-2 mt-4 outline-none"
      />
      {errors.password && (
        <div className="text-red-500 text-sm mt-2">{errors.password}</div>
      )}
      {errors.passwordLength && (
        <div className="text-red-500 text-sm mt-2">{errors.passwordLength}</div>
      )}

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="block w-[90%] mx-auto px-6 py-3 rounded-lg border-2 mt-4 outline-none"
      />
      {errors.passwordMatch && (
        <div className="text-red-500 text-sm mt-2">{errors.passwordMatch}</div>
      )}

      <div className="flex items-center space-x-4 mt-6">
        {!loading && (
          <button
            onClick={handleSubmit}
            className="px-3 py-2 border-2 text-sm border-black text-black rounded-full"
          >
            Change Password
          </button>
        )}
        {loading && (
          <button className="px-3 py-2 border-2 text-sm border-black text-black rounded-full">
            Loading...
          </button>
        )}
        <Link
          to="/forgetpassword"
          className="px-3 py-2 border-2 border-black text-sm text-black inline-block rounded-full"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
