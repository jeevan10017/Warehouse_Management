import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error('Login failed. Please try again.', {
        theme: "dark",
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Google login successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error('Google login failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="p-8  m-10 rounded-lg shadow-lg w-96 bg-gradient-to-r from-gray-800 via-gray-900 to-custom-blue transition-all duration-500 ease-in-out"
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-white">Login</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-300">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 bg-gray-700 border border-custom-blue rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-custom-blue1 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-300">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 bg-gray-700 border border-custom-blue rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-custom-blue1 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full px-3 py-2 text-white bg-gradient-to-r from-custom-blue to-custom-blue1 hover:bg-gradient-to-l rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full px-3 py-2 mt-4 text-white bg-gradient-to-r from-red-600 to-red-500 hover:bg-gradient-to-l rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        >
          Login with Google
        </button>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account? <a href="/register" className="text-custom-blue1 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
