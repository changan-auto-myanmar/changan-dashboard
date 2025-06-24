// src/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleLogin from "../api/handleLogin";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const res = await handleLogin(data);
    // console.log(res);
    if (res) {
      setTimeout(() => {
        navigate("/home/image-vedio");
      }, 1000);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              size="lg"
              id="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOffIcon size={20} className="text-gray-500" />
              ) : (
                <EyeIcon size={20} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
