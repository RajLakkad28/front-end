import React, { useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const chatBoxRef = useRef(null);

  const responses = {
    hello: {
      message: "Hello! How can I assist you with your event ticket booking today?",
      options: ["Book Tickets", "Event Details", "Contact Info"]
    },
    "Book Tickets": {
      message: "You can book tickets by visiting our website or contacting us directly. Would you like more details?",
      options: ["Yes", "No"]
    },
    Yes: {
      message: "Please visit www.Eventticketing.com to book your tickets online or call us for assistance.",
      options: ["Main Menu"]
    },
    No: {
      message: "Okay! Let me know if you need any further assistance.",
      options: ["Main Menu"]
    },
    "Event Details": {
      message: "We host various events throughout the year. What specific event would you like to know more about?",
      options: ["Concert", "Workshop", "Main Menu"]
    },
    Concert: {
      message: "Our next concert detail is available in  our website. Tickets are available online,Go through it.",
      options: ["Book Tickets", "Main Menu"]
    },
    Workshop: {
      message: "Our next workshop detail is available in our website . Register on our website!",
      options: ["Book Tickets", "Main Menu"]
    },
    "Contact Info": {
      message: "You can reach us at contact@youreventwebsite.com or call us at +1-123-456-7890.",
      options: ["Main Menu"]
    },
    bye: {
      message: "Thank you for using the Event Ticket Booking Chatbot. Have a great day!",
      options: []
    },
    "Main Menu": {
      message: "You are back to the main menu. How can I assist you further?",
      options: ["Book Tickets", "Event Details", "Contact Info"]
    }
  };

  useEffect(() => {
    initChat(); // Initialize chat on component mount
  }, []);

  const initChat = () => {
    displayMessage(responses.hello.message, 'bot-message');
    displayOptions(responses.hello.options);
  };

  const displayMessage = (message, className) => {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${className}`;
    messageElement.textContent = message;
    chatBoxRef.current.appendChild(messageElement);
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to the bottom
  };

  const displayOptions = (options) => {
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.textContent = option;
      button.onclick = () => handleOptionClick(option);
      chatBoxRef.current.appendChild(button);
    });
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to the bottom after adding options
  };

  const displayTypingIndicator = () => {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.textContent = "Bot is typing...";
    chatBoxRef.current.appendChild(typingIndicator);
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Scroll to the bottom
    return typingIndicator; // Return the typing indicator element
  };

  const removeTypingIndicator = (typingIndicator) => {
    setTimeout(() => {
      chatBoxRef.current.removeChild(typingIndicator);
    }, 1000); // Remove typing indicator after a delay
  };

  const handleOptionClick = (option) => {
    displayMessage(option, 'user-message'); // Show user's selected option
    const typingIndicator = displayTypingIndicator(); // Show typing indicator

    setTimeout(() => {
      let responseMessage;
      const responseOptions = [];

      // Determine the response based on user selection
      if (responses[option]) {
        responseMessage = responses[option].message;
        responseOptions.push(...responses[option].options);
      } else {
        responseMessage = "I'm sorry, I can only answer questions related to event ticket booking.";
      }

      removeTypingIndicator(typingIndicator); // Remove typing indicator
      displayMessage(responseMessage, 'bot-message'); // Show bot response

      // Show relevant options after bot response
      displayOptions(responseOptions.length ? responseOptions : responses.hello.options);
    }, 1000); // Simulate a delay for the bot's response
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">Event Ticket Booking Chatbot</div>
        <div className="chat-box" ref={chatBoxRef}></div>
      </div>
    </div>
  );
};

export default Chatbot;
