import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        textAlign: 'center',
    };

    const svgStyle = {
        color: '#38a169', // Green color
        width: '64px',
        height: '64px',
        margin: '20px auto',
    };

    const headingStyle = {
        fontSize: '1.5rem',
        color: '#4a5568', // Gray color
        fontWeight: '600',
    };

    const paragraphStyle = {
        color: '#718096', // Gray color
        margin: '10px 0',
    };

    const linkStyle = {
        display: 'inline-block',
        padding: '12px 24px',
        backgroundColor: '#4c51bf', // Indigo color
        color: 'white',
        fontWeight: '600',
        textDecoration: 'none',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    };

    const linkHoverStyle = {
        backgroundColor: '#434190', // Darker indigo color on hover
    };

    return (
      
        <div style={containerStyle}>
            <div>
                <svg viewBox="0 0 24 24" style={svgStyle}>
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div>
                    <h3 style={headingStyle}>Payment Done!</h3>
                    <p style={paragraphStyle}>Thank you for completing your secure online payment.</p>
                    <p style={paragraphStyle}>Have a great day!</p>
                    <div style={{ padding: '20px 0' }}>
                        <Link 
                            to="/" 
                            style={linkStyle} 
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = linkStyle.backgroundColor}
                        >
                            GO BACK
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
