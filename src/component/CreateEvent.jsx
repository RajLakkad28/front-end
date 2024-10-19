import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateEvent.css';
import Modal from './Modal';
import {jwtDecode} from 'jwt-decode'; // Correct the import
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Only check if the email matches admin@gmail.com
        if (decodedToken.email === 'admin@gmail.com') {
          setUser({
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            email: decodedToken.email,
            phone: decodedToken.phone,
            address: decodedToken.address,
          });
        } else {
          // Redirect to unauthorized page if the email is not admin@gmail.com
          navigate('/unauthorized');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/login'); // Redirect to login on error
      }
    } else {
      navigate('/login'); // Redirect to login if no token
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/api/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Event created successfully!');
      setModalOpen(true);
      // Clear the form
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
      setPrice(null);
      setImage(null);
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage('Failed to create event. Please try again.');
      setModalOpen(true);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Event Image</label>
          <input
            type="file"
            className="form-control p-1"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create Event
        </button>
      </form>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} content={message} />
    </div>
  );
};

export default CreateEvent;