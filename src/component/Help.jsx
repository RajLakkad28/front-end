import React from 'react';
import './Help.css'; // Import the CSS file for custom styles

const Help = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Help & Support</h1>
      
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="section-title">Frequently Asked Questions (FAQs)</h2>
          <div className="faq-item">
            <h5 className="faq-question">1. How do I reset my password?</h5>
            <p className="faq-answer">If you have forgotten your password, you can reset it by clicking on the "Forgot password?" link on the login page. Follow the instructions sent to your email to create a new password.</p>
          </div>
          <div className="faq-item">
            <h5 className="faq-question">2. How can I contact customer support?</h5>
            <p className="faq-answer">You can contact customer support by emailing us at <a href="mailto:support@example.com" className="email-link">support@example.com</a> or by calling us at (123) 456-7890.</p>
          </div>
          <div className="faq-item">
            <h5 className="faq-question">3. What should I do if I encounter a bug?</h5>
            <p className="faq-answer">If you encounter a bug or technical issue, please report it through our contact form or email us with details about the issue. We will work to resolve it as quickly as possible.</p>
          </div>
        </div>
        
        <div className="col-md-6">
          <h2 className="section-title">Contact Us</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" className="form-control" placeholder="Your email address" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" className="form-control" rows="4" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Help;
