import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for routing

const Payment = () => {
  const { merchantTransactionId } = useParams(); // Get the transaction ID from the URL
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/payment/validate/${merchantTransactionId}`);
        setPaymentStatus(response.data);
      } catch (err) {
        setError('Error fetching payment status. Please try again later.');
      }
    };

    fetchPaymentStatus();
  }, [merchantTransactionId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2>Payment Status</h2>
      {paymentStatus ? (
        <div>
          <h4>Transaction ID: {paymentStatus.merchantTransactionId}</h4>
          <p>Status: {paymentStatus.responseCode}</p>
          <p>Amount: {paymentStatus.amount / 100} INR</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading payment status...</p>
      )}
    </div>
  );
};

export default Payment;
