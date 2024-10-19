import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

const EventProfile = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserEvents = async () => {
    const token = localStorage.getItem('token'); // Adjust based on how you're storing tokens

    try {
      const response = await fetch('http://localhost:3001/api/user/events', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setUserEvents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (eventId) => {
    const token = localStorage.getItem('token'); // Adjust based on how you're storing tokens
  
    try {
      const response = await fetch(`http://localhost:3001/api/user/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
  
      // Filter out the deleted event from the state
      setUserEvents(prevEvents => prevEvents.filter(event => event.eventId !== eventId));
  
      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Event removed successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 1000, // Alert will close after 2 seconds
        timerProgressBar: true,
      });
    } catch (error) {
      setError(error.message);
      // Show error alert
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to remove event. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 1000, // Alert will close after 2 seconds
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    fetchUserEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <Navbar />
    <div className="container-fluid mt-5 p-0">
      <div className="row mx-0 justify-content-center">
        {/* Wishlist Heading */}
        <div className="col-12 text-center mb-5">
          <h2 className="wishlist-heading" style={{ fontWeight: "bold", color: "#ff416c", fontSize: "2.5rem" }}>
            My Wishlist
          </h2>
        </div>
        
        {userEvents.length > 0 ? (
          userEvents.map(event => (
            <div key={event.eventId} className="col-lg-3 col-md-4 col-sm-6 mb-4 px-4">
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
                    alt={event.title}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
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
                    <i className="bi bi-tag-fill" style={{ color: "#ff416c" }}></i> {event.title}
                  </h5>
                  <h6 className="card-subtitle mb-2" style={{ color: "black" }}>
                    <i className="bi bi-calendar-event" style={{ color: "#ff416c" }}></i> {new Date(event.date).toLocaleDateString()}
                  </h6>
                  <p className="card-text text-truncate" style={{ opacity: "0.9", fontSize: "0.95rem", color: "black" }}>
                    <i className="bi bi-info-circle-fill"></i> {event.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <p className="card-text mb-0" style={{ color: "black" }}>
                    <i className="bi bi-currency-rupee text-success"></i> <strong>{event.price} /-</strong>
                    </p>
                    <p className="card-text mb-0" style={{ color: "black" }}>
                      <i className="bi bi-geo-alt-fill text-danger"></i> {event.location}
                    </p>
                  </div>
                  <button className="btn btn-danger mt-3" onClick={() => removeEvent(event.eventId)}>
                    <i className="bi bi-trash-fill"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No events found.</div>
        )}
      </div>
    </div>
    </>
  );
};

export default EventProfile;
