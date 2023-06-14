import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const token = localStorage.getItem('token');
  return (
    <div>
      <h4>Welcome to Text Analyzer</h4>
      {token !== null ? (
        <Link to="/textanalyzer">Go to Text Analyzer</Link>
      ) : (
        <>
          <p><Link to="/login">Click to Login</Link></p>
          <p><Link to="/signup">New User Sign up</Link></p>
        </>
      )}
    </div>
  );
}
