import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const BookedEvents = () => {
    const [bookedTickets, setBookedTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const email = localStorage.getItem('email'); // Assuming email is stored in localStorage

    useEffect(() => {
        const fetchBookedTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/booked-tickets?email=${email}`);
                setBookedTickets(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching booked tickets:", error);
                setLoading(false);
            }
        };

        fetchBookedTickets();
    }, [email]);

    if (loading) {
        return <div>Loading...</div>; // You can style this loading message
    }

    return (
        <>
         <Navbar />
        <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4A5568' }}>Your Booked Events</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {bookedTickets.length === 0 ? (
                    <p>No booked events found.</p>
                ) : (
                    bookedTickets.map(ticket => (
                        <div key={ticket._id} style={ticketCardStyle}>
                            {/* Display the event image */}
                            <img 
                                src={ticket.imageUrl} 
                                alt={ticket.title} 
                                style={imageStyle}
                            />
                            <h3 style={{ color: '#2D3748' }}>{ticket.event.title}</h3>
                            <p><strong>Date:</strong> {new Date(ticket.event.date).toLocaleDateString()}</p>
                            <p><strong>Location:</strong> {ticket.event.location}</p>
                            <p><strong>Number of Tickets:</strong> {ticket.numberOfTickets}</p>
                            <p><strong>Total Price:</strong> ${ticket.totalPrice}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    );
};

// Define the styles for the ticket card
const ticketCardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    padding: '15px',
    width: '300px',
    textAlign: 'left',
};

// Define styles for the event image
const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
    marginBottom: '10px',
};

export default BookedEvents;
