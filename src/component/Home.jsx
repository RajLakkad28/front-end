import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Home.css';
import Footer from './Footer';
import axios from 'axios';
import './Loader.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 2; // Number of items to display per page
  const [showDetailsPopup, setShowDetailsPopup] = useState(false); // Control popup visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Store selected event details
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Control payment modal visibility
  const [numberOfTickets, setNumberOfTickets] = useState(1); // Number of tickets to book
  const token = localStorage.getItem('token'); // Get JWT token from local storage
  const navigate = useNavigate();

  const userDetails = {
    fullname: localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName'),
    email: localStorage.getItem('email'),
  };

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/events');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching events. Please try again later.');
        setLoading(false);
      }
    };


    fetchEvents();
  }, []);


  const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredEvents = sortedEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the index of the first and last event on the current page
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handleBooking = async (eventId) => {
    if (!token) {
      Swal.fire({
        title: 'Please log in',
        text: 'You need to be logged in to book an event.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then(() => {
        navigate('/login'); // Redirect to login page
      });
      return;
    }
    try {
      const token = localStorage.getItem('token'); // Ensure you get the token
      const response = await axios.post(`http://localhost:3001/api/book/${eventId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


      // Success alert with modern styling
      Swal.fire({
        title: '<strong><i class="fas fa-check-circle" style="color: #28a745;"></i> Success!</strong>',
        html: '<div style="font-size: 16px; line-height: 1.5;">Event added to your booking list successfully! 🎉</div>',
        icon: 'success',
        confirmButtonText: 'Great!',
        timer: 1000, // Set timer for 2 seconds
        timerProgressBar: true,
        customClass: {
          popup: 'swal-popup-modern',
          title: 'swal-title-modern',
          html: 'swal-text-modern',
          confirmButton: 'swal-button-modern'
        },
        backdrop: 'rgba(0, 0, 0, 0.5)',
        willClose: () => {
          console.log('Booking response:', response.data);
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Warning alert with modern styling
        Swal.fire({
          title: '<strong><i class="fas fa-exclamation-triangle" style="color: #ffc107;"></i> Oops!</strong>',
          html: '<div style="font-size: 16px; line-height: 1.5;">This event is already in your wishlist! ❤️</div>',
          icon: 'warning',
          confirmButtonText: 'Got it!',
          timer: 1000,
          timerProgressBar: true,
          customClass: {
            popup: 'swal-popup-warning-modern',
            title: 'swal-title-warning-modern',
            html: 'swal-text-warning-modern',
            confirmButton: 'swal-button-warning-modern'
          },
          backdrop: 'rgba(255, 255, 255, 0.9)',
        });
      } else {
        // Error alert with modern styling
        Swal.fire({
          title: '<strong><i class="fas fa-times-circle" style="color: #dc3545;"></i> Error!</strong>',
          html: '<div style="font-size: 16px; line-height: 1.5;">Failed to add event. Please try again later! ❌</div>',
          icon: 'error',
          confirmButtonText: 'Okay',
          timer: 1000,
          timerProgressBar: true,
          customClass: {
            popup: 'swal-popup-error-modern',
            title: 'swal-title-error-modern',
            html: 'swal-text-error-modern',
            confirmButton: 'swal-button-error-modern'
          },
          backdrop: 'rgba(255, 255, 255, 0.9)',
        });
      }
    }
  };

  const handlePayment = async () => {
    const amount = selectedEvent.price * numberOfTickets; // Calculate total amount
    const data = {
      name: `${userDetails.fullname}`,
      email: userDetails.email,
      amount: amount,
      eventId: selectedEvent._id, // Include the event ID
      numberOfTickets: numberOfTickets, // Include the number of tickets
      imageUrl : selectedEvent.imageUrl,
    };

    console.log(data);

    try {
      const response = await axios.post('http://localhost:3001/create-order', data);
      window.location.href = response.data.url; // Redirect to payment URL
    } catch (error) {
      console.error('Error in payment:', error);
    }
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to open details popup
  const openDetailsPopup = (event) => {
    setSelectedEvent(event);
    setShowDetailsPopup(true);
  };

  // Function to close details popup
  const closeDetailsPopup = () => {
    setShowDetailsPopup(false);
    setSelectedEvent(null);
  };

  const openPaymentModal = (event) => {
    setSelectedEvent(event);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setNumberOfTickets(1);
  };

  if (loading) {
    return (
      <div className="full-loader-container">
        <div className="loader">
          <div className="loader-circle"></div>
        </div>
        <div className="loading-text">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <div className="container-fluid p-0 vh-100">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="hero-section">
        <div className="content">
          <h1>Event ticketing made simple</h1>
          <p>Start selling tickets in a few minutes</p>
        </div>
      </div>
      <div className="container-fluid mt-5 p-0">
        <div className="row mx-0 justify-content-center">
          {currentEvents.map(event => (
            <div key={event._id} className="col-lg-3 col-md-4 col-sm-6 mb-4 px-4">
              <div
                className="card glass-card h-100 border-0"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.1)", // Glass effect
                  backdropFilter: "blur(10px)", // Blurred background
                  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0px 15px 40px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 8px 30px rgba(0, 0, 0, 0.2)";
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={event.imageUrl}
                    className="card-img-top"
                    alt={event.title}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  {/* Floating Badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "#ff416c",
                      color: "#fff",
                      padding: "5px 12px",
                      borderRadius: "25px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Featured
                  </span>
                </div>

                <div className="card-body p-4" style={{ color: "black" }}>
                  <h5 className="card-title text-truncate" style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                    <i className="bi bi-tag-fill" style={{ color: "#ff416c" }}></i>{" "}
                    {event.title}
                  </h5>
                  <h6 className="card-subtitle mb-2" style={{ color: "black" }}>
                    <i className="bi bi-calendar-event" style={{ color: "#ff416c" }}></i>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </h6>
                  <p className="card-text text-truncate" style={{ opacity: "0.9", fontSize: "0.95rem", color: "black" }}>
                    <i className="bi bi-info-circle-fill"></i> {event.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <p className="card-text mb-0" style={{ color: "black" }}>
                      <i className="bi bi-currency-rupee text-success"></i>{" "}
                      <strong>{event.price} /-</strong>
                    </p>
                    <p className="card-text mb-0" style={{ color: "black" }}>
                      <i className="bi bi-geo-alt-fill text-danger"></i>{" "}
                      {event.location}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <button
                      onClick={() => handleBooking(event._id)}
                      className="btn btn-gradient btn-sm"
                      style={{
                        background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                        borderRadius: "30px",
                        padding: "8px 20px",
                        color: "#fff",
                        fontWeight: "bold",
                        boxShadow: "0px 4px 12px rgba(255, 65, 108, 0.4)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0px 8px 20px rgba(255, 65, 108, 0.7)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0px 4px 12px rgba(255, 65, 108, 0.4)")}
                    >
                      <i className="bi bi-heart-fill"></i> Wishlist
                    </button>


                    <button onClick={() => openPaymentModal(event)} className="btn mx-2 btn-primary btn-block mt-1">
                      Book Now
                    </button>




                    <button
                      onClick={() => openDetailsPopup(event)}
                      className="btn btn-outline-light btn-sm"
                      style={{
                        borderRadius: "30px",
                        padding: "10px 25px",
                        border: "2px solid rgba(255, 255, 255, 0.8)", // Increased opacity for better visibility
                        backgroundColor: 'rgba(255, 65, 108, 0.8)', // A solid background color
                        color: 'white',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', // Darker shadow for depth
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 65, 108, 1)'; // Change to solid on hover
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5)'; // Stronger shadow on hover
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 65, 108, 0.8)'; // Reset to semi-transparent
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      Details
                    </button>


                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {showDetailsPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2 className="popup-title">{selectedEvent.title}</h2>
            <div className="popup-scroll">
              <div className="popup-content">
                {/* Date */}
                <p className="popup-detail">
                  <i className="bi bi-calendar-event" style={{ color: "#ff416c" }}></i> {/* Calendar icon */}
                  <strong>Date: </strong> {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
                {/* Location */}
                <p className="popup-detail">
                  <i className="bi bi-geo-alt-fill text-danger"></i> {/* Location icon */}
                  <strong>Location: </strong> {selectedEvent.location}
                </p>
                {/* Description */}
                <p className="popup-detail">
                  <i className="bi bi-info-circle-fill" style={{ color: "#00aaff" }}></i> {/* Info icon */}
                  <strong>Description: </strong> {selectedEvent.description}
                </p>
                {/* Price */}
                <p className="popup-detail">
                  <i className="bi bi-cash price-icon" style={{ color: "#28a745" }}></i> {/* Price icon */}
                  <strong>Price: </strong>₹ {selectedEvent.price}<strong> /-</strong>
                </p>
                {/* Event Image */}
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="popup-image" />
              </div>
            </div>
            {/* Close Icon */}
            <i
              className="bi bi-x-circle close-icon" // Bootstrap Icon for close
              onClick={closeDetailsPopup}
            ></i>

          </div>
        </div>
      )}



      {showPaymentModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000, // Ensure the modal is on top
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.title}
              style={{
                width: '100%',
                borderRadius: '8px',
                marginBottom: '15px',
              }}
            />
            <h2 style={{ fontSize: '24px', margin: '10px 0', color: '#28a745' }}>
              {selectedEvent.title}
            </h2>
            <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Price per ticket:</strong> ₹{selectedEvent.price}</p>
            <p><strong>Total Amount:</strong> ₹{selectedEvent.price * numberOfTickets}</p>

            <label htmlFor="numberOfTickets" style={{ display: 'block', margin: '10px 0 5px', fontWeight: 'bold', color: '#555' }}>
              Number of Tickets:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '120px' }}>
              <button
                onClick={() => setNumberOfTickets(Math.max(1, numberOfTickets - 1))} // Decrease tickets, minimum 1
                style={{
                  backgroundColor: '#28a745', // Bootstrap success color
                  color: 'white',
                  border: 'none',
                  padding: '11px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                -
              </button>

              <input
                type="number"
                id="numberOfTickets"
                value={numberOfTickets}
                min="1"
                readOnly // Make input read-only
                style={{
                  width: '60px',
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />

              <button
                onClick={() => setNumberOfTickets(numberOfTickets + 1)} // Increase tickets
                style={{
                  backgroundColor: '#28a745', // Bootstrap success color
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
              >
                +
              </button>
            </div>

            <div className="d-flex justify-content-between">
              <button onClick={handlePayment}
                style={{
                  backgroundColor: '#28a745', // Bootstrap success color
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Pay Now
              </button>
              <button onClick={closePaymentModal}
                style={{
                  backgroundColor: 'transparent',
                  color: '#555',
                  border: '1px solid #ccc',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}








      <Footer />
    </div>
  );
};

export default Home;
