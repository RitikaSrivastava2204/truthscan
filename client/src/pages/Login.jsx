import React from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Mock login validation
    if (data.email === 'test@example.com' && data.password === 'password') {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google Credential Response:', credentialResponse);
    toast.success('Google login successful!');
    // Handle your login logic here (e.g., send token to backend)
  };

  const handleGoogleLoginError = () => {
    toast.error('Google login failed. Try again.');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login to TruthScan</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}

          <button type="submit" className="login-btn">Start Detecting</button>
        </form>

        <div className="divider">OR</div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
          useOneTap
        />

      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
