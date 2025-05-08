import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import axios from "axios";
import userLogin from "../store/userLogin";

const Login= () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useAtom(userLogin);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user.email || !user.password) {
      console.warn("Email and password are required.");
      return;
    }

    try {
      
      const response = await axios.post(`http://localhost:8080/auth/login`, {
        email: user.email,
        password: user.password,
      });
      const token=response.data.access_token;
      localStorage.setItem('token',token);
      console.log("Login successful:", response.data);
      navigate('/user/profile')
      
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white font-satoshi">
      <div className="bg-white text-gray-700 rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
        <p className="text-gray-500 text-center text-sm mt-2">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/auth/signup")}
          >
            Sign Up
          </span>
        </p>

        <div className="mt-6">
          <input
            value={user.email}
            onChange={(e) =>
              setUser((prevUser) => ({
                ...prevUser,
                email: e.target.value,
              }))
            }
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative mt-4">
            <input
              value={user.password}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  password: e.target.value,
                }))
              }
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full p-3 mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
