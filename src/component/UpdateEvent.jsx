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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedEventData, setEditedEventData] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

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

  // Remove sorting logic
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Function to start editing an event
  const handleEditClick = (event) => {
    setEditingEventId(event._id);
    setEditedEventData({
      title: event.title,
      description: event.description,
      date: event.date,
      price: event.price,
      location: event.location,
      imageUrl: event.imageUrl,
    });
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEventData(prevData => ({ ...prevData, [name]: value }));
  };

  // Function to save edited event
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/update/${editingEventId}`, editedEventData);
      const updatedEvents = events.map(event => (event._id === editingEventId ? response.data : event));

      setEditingEventId(null);
      Swal.fire('Success!', 'Event updated successfully.', 'success');

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      Swal.fire('Error!', 'Failed to update event.', 'error');
    }
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingEventId(null);
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

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <div className="container-fluid p-0 vh-100">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="container-fluid mt-5 p-0">
        <div className="row mx-0 justify-content-center">
          {currentEvents.map(event => (
            <div key={event._id} className="col-lg-3 col-md-4 col-sm-6 mb-4 px-4">
              <div
                className="card glass-card h-100 border-0"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  overflow: "hidden",
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
                  {editingEventId === event._id ? (
                    <>
                      <input
                        type="text"
                        name="title"
                        value={editedEventData.title}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                      />
                      <textarea
                        name="description"
                        value={editedEventData.description}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="date"
                        name="date"
                        value={editedEventData.date.split('T')[0]} // format date for input
                        onChange={handleInputChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editedEventData.price}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                      />
                      <input
                        type="text"
                        name="location"
                        value={editedEventData.location}
                        onChange={handleInputChange}
                        className="form-control mb-2"
                      />
                      <div className="d-flex justify-content-between">
                        <button onClick={handleSaveEdit} className="btn btn-success">Save</button>
                        <button onClick={handleCancelEdit} className="btn btn-danger">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
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
                      <div className="d-flex justify-content-center mt-4">
                        <button
                          onClick={() => handleEditClick(event)}
                          className="btn btn-gradient btn-sm"
                          style={{
                            background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                            borderRadius: "30px",
                            padding: "8px 20px",
                            color: "#fff",
                            fontWeight: "bold",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center my-4">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages).keys()].map(number => (
              <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(number + 1)}>{number + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
