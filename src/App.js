import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Event from './component/Event';
import Help from './component/Help';
import TermsOfService from './component/TermsOfService';
import PrivacyPolicy from './component/PrivacyPolicy';
import Profile from './component/Profile';
import Chatbot from './component/chatbot';
import Payment from './component/Payment';

import CreateEvent from './component/CreateEvent';
import PaymentSuccess from './component/PaymentSuccess';
import BookedEvents from './component/BookedTickets';
import UpdateEvent from './component/UpdateEvent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Event" element={<Event />} />
        <Route path="/CreateEvent" element={<CreateEvent />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/BookedEvents" element={<BookedEvents/>} />
        <Route path="/Chatbot" element={<Chatbot />} />
        <Route path="/EditEvent" element={<UpdateEvent/>} />
        <Route path="/payment-successful" element={<PaymentSuccess />} />
        <Route path="/payment/:merchantTransactionId" element={<Payment />} />
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
