import React, { useState } from "react";
import { Header } from "./header";

function Login_signup() {
  const [isLogin, setIsLogin] = useState(true);
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

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", signupData);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center bg-gray-100 p-4">
        <div
          className={`w-[500px] bg-white p-8 rounded-2xl shadow-lg mt-2.5 ${
            isLogin ? "h-[360px]" : "h-[530px]"
          }`}
        >
          {/* Header */}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Student Login" : "Student Signup"}
          </h2>

          {/* Login Form */}
          {isLogin && (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={loginData.phone}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-1/2 mx-auto block bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Login
              </button>

              <p className="mt-4 text-center text-gray-600">
                Don't have an account?{" "}
                <span
                  className="text-blue-500 font-semibold cursor-pointer hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Signup
                </span>
              </p>
            </form>
          )}

          {/* Signup Form */}
          {!isLogin && (
            <form className="space-y-4" onSubmit={handleSignupSubmit}>
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Row 2: Email + Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Row 3: College (full width) */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">College Name</label>
                <input
                  type="text"
                  name="college"
                  value={signupData.college}
                  onChange={handleSignupChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Row 4: Branch + Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={signupData.branch}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={signupData.year}
                    onChange={handleSignupChange}
                    min="1"
                    max="8"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-1/2 mx-auto block bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Signup
              </button>

              <p className="mt-4 text-center text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-blue-500 font-semibold cursor-pointer hover:underline"
                  onClick={() => setIsLogin(true)}
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
