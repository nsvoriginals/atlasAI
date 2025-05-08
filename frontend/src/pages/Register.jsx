import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import axios from "axios";
import userAtom from "../store/userStore";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleSubmit = async () => {
    if (!user.username || !user.email || !user.password) {
      console.warn("All fields (username, email, password) are required.");
      return;
    }

    try {
      
      const response = await axios.post(`http://localhost:8080/auth/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
      });

      console.log("Registration successful:", response.data);
      navigate('/auth/signin');
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white font-satoshi">
      <div className="bg-white text-gray-700 rounded-2xl shadow-2xl max-w-4xl flex overflow-hidden w-full">
        
        <div
          className="hidden md:flex flex-col justify-between p-8 w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage: `url('https://i.pinimg.com/736x/6f/3f/74/6f3f7456a6d298763b28e837f271c541.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-l-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-white text-2xl font-bold">Welcome Back!</h2>
            <p className="text-gray-200 text-sm mt-2">Sign in to continue your journey.</p>
          </div>
        </div>

        
        <div className="p-10 w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-500 text-sm mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/auth/signin")}
            >
              Log in
            </span>
          </p>

         
          <div className="mt-6 space-y-4">
            <input
              value={user.username}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, username: e.target.value }))
              }
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              value={user.email}
              onChange={(e) =>
                setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
              }
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="relative">
              <input
                value={user.password}
                onChange={(e) =>
                  setUser((prevUser) => ({ ...prevUser, password: e.target.value }))
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
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
