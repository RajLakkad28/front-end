import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Corrected jwtDecode import
import { FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaEdit } from 'react-icons/fa'; // Import FaEdit for the edit button
import Swal from 'sweetalert2'; // Import Sweetalert for better user feedback

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin check
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token has expired, log out the user
          handleLogout();
        } else {
          setUser({
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            email: decodedToken.email, // Assuming the email is in the token
          });

          // Check if the user is an admin
          if (decodedToken.email === 'admin@gmail.com') {
            setIsAdmin(true); // Set admin state to true
          }

          // Set timeout to auto logout the user when the token expires
          const tokenExpiryTime = decodedToken.exp * 1000 - Date.now();
          setTimeout(() => {
            handleLogout();
            Swal.fire({
              title: 'Session Expired',
              text: 'You have been logged out due to inactivity. Please sign in again.',
              icon: 'info',
              confirmButtonText: 'OK'
            });
          }, tokenExpiryTime);
        }
      } catch (error) {
        console.error('Invalid token', error);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false); // Reset admin state on logout
    navigate('/login');
  };

  const handleCreateEventClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/CreateEvent');
    } else {
      navigate('/login');
    }
  };

  const handleEditClick = () => {
    // Navigate to the edit page
    navigate('/EditEvent');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <Link className="navbar-brand" to="/">EVENT BOOKINGS</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/event">Explore Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link bg-danger text-white" to="/bookedEvents">Booked Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/help">Help</Link>
          </li>
        </ul>
        <form className="form-inline ml-auto my-2 my-lg-0 search-form">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search events"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => e.preventDefault()}>Search</button>
        </form>
        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button">
                  {`Hello, ${user.firstName} ${user.lastName}`}
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/Profile">
                    <FaUser className="mr-2" /> Your Profile
                  </Link>
                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                    <FaSignOutAlt className="mr-2" /> Logout
                  </Link>
                </div>
              </li>

              {/* Conditionally render the Create Event and Edit buttons */}
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <button className="btn btn-success create-event-btn" onClick={handleCreateEventClick}>Create Event</button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-info edit-btn ml-2" onClick={handleEditClick}>
                      <FaEdit className="mr-2" /> Edit Event
                    </button>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button">
                  Greetings! Sign in
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/login">
                    <FaSignInAlt className="mr-2" /> Sign In
                  </Link>
                  <Link className="dropdown-item" to="/signup">
                    <FaUserPlus className="mr-2" /> Sign Up
                  </Link>
                </div>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link className="nav-link nav-link-flag" to="#">India</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
