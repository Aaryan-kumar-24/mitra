import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "./header";
import { AuthContext } from "./AuthContext";

function Login_signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [profileFile, setProfileFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // To disable buttons during network ops

  const [loginData, setLoginData] = useState({ phone: "", password: "" });

  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    college: "",
    branch: "",
    year: "",
  });

  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  // 📸 Handler to store the selected file object in state
  const handleProfileFileChange = (e) => {
    setProfileFile(e.target.files[0]);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginData.phone, loginData.password);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    if (!profileFile) {
      alert("Please upload your profile photo");
      setIsLoading(false);
      return;
    }

    // 📩 COMBINE DATA AND IMAGE INTO FormData
    const formData = new FormData();
    formData.append("profileFile", profileFile); // The key name must match the backend's upload middleware ('profileFile')
    
    // Append all other signup fields
    Object.keys(signupData).forEach(key => {
        formData.append(key, signupData[key]);
    });

    // 🚀 SEND DATA AND FILE TO BACKEND
    try {
        // We now post to the same endpoint, but the backend must handle the file
        await axios.post("http://localhost:8000/signup-user", formData, {
            headers: {
                // IMPORTANT: Tell the server we are sending a file
                'Content-Type': 'multipart/form-data', 
            },
        });
      
      // Success: Switch to login and pre-fill phone number
      alert("Signup Successful! Please log in.");
      setIsLogin(true);
      setLoginData({ phone: signupData.phone, password: "" });
    
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed (Server Error).");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (isAuthenticated) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-start justify-center bg-white pt-10">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 border border-sky-200">
          <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
            {isLogin ? "Login" : "Create Account"}
          </h2>

          {/* LOGIN FORM (Unchanged) */}
          {isLogin && (
            <form className="space-y-5 mt-10" onSubmit={handleLoginSubmit}>
              {/* Login fields... */}
              <div><label className="text-gray-700 font-medium">Phone Number</label><input type="tel" name="phone" value={loginData.phone} onChange={handleLoginChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>
              <div><label className="text-gray-700 font-medium">Password</label><input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>

              <button
                type="submit"
                disabled={isLoading} 
                className={`w-full text-white py-2 rounded-lg font-semibold transition ${isLoading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'}`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <span
                  className="text-sky-500 font-semibold cursor-pointer"
                  onClick={() => {
                    setIsLogin(false);
                    setIsLoading(false);
                  }}
                >
                  Signup
                </span>
              </p>
            </form>
          )}

          {/* SIGNUP FORM */}
          {!isLogin && (
            <form className="space-y-5 mt-4" onSubmit={handleSignupSubmit}>
              {/* Profile Upload */}
              <div>
                <label className="text-gray-700 font-medium mb-1 block">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileFileChange} 
                    required
                    className="flex-1 px-4 py-3 border rounded-lg cursor-pointer border-sky-300"
                  />
                  {profileFile && (
                    <img
                      src={URL.createObjectURL(profileFile)}
                      alt="preview"
                      className="w-20 h-20 rounded-full object-cover border border-sky-300"
                    />
                  )}
                </div>
              </div>
              {/* Name + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-700 font-medium">Full Name</label><input type="text" name="name" value={signupData.name} onChange={handleSignupChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>
                <div><label className="text-gray-700 font-medium">Phone Number</label><input type="tel" name="phone" value={signupData.phone} onChange={handleSignupChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>
              </div>
              {/* Email + Password */}
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-700 font-medium">Email</label><input type="email" name="email" value={signupData.email} onChange={handleSignupChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>
                <div><label className="text-gray-700 font-medium">Password</label><input type="password" name="password" value={signupData.password} onChange={handleSignupChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>
              </div>
              {/* College + Branch */}
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-gray-700 font-medium">College</label><input type="text" name="college" value={signupData.college} onChange={handleSignupChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>
                <div><label className="text-gray-700 font-medium">Branch</label><input type="text" name="branch" value={signupData.branch} onChange={handleSignupChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>
              </div>
              {/* Year */}
              <div><label className="text-gray-700 font-medium">Year</label><input type="number" min="1" max="8" name="year" value={signupData.year} onChange={handleSignupChange} required className="w-full px-4 py-2 border rounded-lg mt-1 border-sky-300 focus:ring-2 focus:ring-sky-400"/></div>

              <button
                type="submit"
                disabled={isLoading} 
                className={`w-full text-white py-2 rounded-lg font-semibold transition ${isLoading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'}`}
              >
                {isLoading ? 'Uploading & Signing up...' : 'Signup'}
              </button>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-sky-500 font-semibold cursor-pointer"
                  onClick={() => {
                    setIsLogin(true);
                    setIsLoading(false); 
                  }}
                >
                  Login
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Login_signup;