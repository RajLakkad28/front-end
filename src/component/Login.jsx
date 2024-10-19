import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Store the JWT token in local storage
        localStorage.setItem('token', data.token);

        const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decode JWT payload
      localStorage.setItem('firstName', decodedToken.firstName);
      localStorage.setItem('lastName', decodedToken.lastName);
      localStorage.setItem('email', decodedToken.email);
        // Show success alert with timer
        Swal.fire({
          title: 'Success!',
          text: 'Login successful!',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 800, // Alert will close after 2 seconds
          timerProgressBar: true,
        });
        // Redirect to a different page after a brief delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        // Show error alert with timer
        Swal.fire({
          title: 'Error!',
          text: errorData.message || 'Login failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 1500, // Alert will close after 2 seconds
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
      // Show general error alert with timer
      Swal.fire({
        title: 'Oops!',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 1500, // Alert will close after 2 seconds
        timerProgressBar: true,
      });
    }
  };
  
  

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="form-container bg-light p-4 rounded shadow-lg">
        <h2 className="text-center mb-4">Log In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Log In</button>
          <Link to="/forgot-password" className="d-block text-center mt-2">Forgot password?</Link>
          <p className="text-center mt-3">New here? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
