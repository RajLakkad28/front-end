import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './SignUp.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      // Show error alert for password mismatch with timer
      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 2000, // Alert will close after 2 seconds
        timerProgressBar: true,
      });
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
  
      if (response.ok) {
        // Show success alert with timer
        Swal.fire({
          title: 'Success!',
          text: 'Signup successful! Redirecting to login...',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 2000, // Alert will close after 2 seconds
          timerProgressBar: true,
        });
        // Redirect to login page after a brief delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        // Show error alert with timer
        Swal.fire({
          title: 'Error!',
          text: errorData.message || 'Signup failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 2000, // Alert will close after 2 seconds
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('An error occurred. Please try again later.');
      // Show general error alert with timer
      Swal.fire({
        title: 'Oops!',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 2000, // Alert will close after 2 seconds
        timerProgressBar: true,
      });
    }
  };
  
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="sign-up-form bg-light p-4 rounded shadow-lg">
        <h1 className="text-center mb-4">Create Your Account</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login" className="text-primary">Already have an account? Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
