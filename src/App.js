import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import TextAnalyzer from './components/Textanalyzer';

let lastActivityTime;
let inactivityTimeout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null);

    const timeoutDuration = 120000; // 2 minutes in milliseconds
    let remainingTime = timeoutDuration;

    const updateRemainingTime = () => {
      remainingTime = Math.max(timeoutDuration - (Date.now() - lastActivityTime), 0);
      setRemainingTime(remainingTime);
    };

    inactivityTimeout = setTimeout(logoutUser, remainingTime);

    const resetTimeout = () => {
      clearTimeout(inactivityTimeout);
      lastActivityTime = Date.now();
      updateRemainingTime();
      inactivityTimeout = setTimeout(logoutUser, remainingTime);
    };

    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);
    window.addEventListener('scroll', resetTimeout);

    const timer = setInterval(updateRemainingTime, 1000);

    return () => {
      clearTimeout(inactivityTimeout);
      clearInterval(timer);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
      window.removeEventListener('scroll', resetTimeout);
    };
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Router>
      <>
        <Navbar />
        <div className='container-fluid custom-container'>
          <div className="row justify-content-center">
            <div className="col-10 col-md-8 col-lg-8 my-5">
              <div className='card py-1 px-5 shadow'>
                {isLoggedIn && (
                  <p className='d-flex justify-content-end'>
                    Your session will expire in: &nbsp;
                    <span className='badge bg-warning text-dark'>{formatTime(remainingTime)} min</span>
                  </p>
                )}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/textanalyzer" element={<TextAnalyzer />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </>
    </Router>
  );
}

export default App;
