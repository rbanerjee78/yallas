import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUser } from "react-icons/fa";


export default function Home() {
  const token = localStorage.getItem('token');
  return (
    <div>
      <h4>Welcome to Text Analyzer</h4>
      {token !== null ? (
        <Link to="/textanalyzer">Go to Text Analyzer</Link>
      ) : (
        <>
        <p>
        "Welcome to the Text Analyzer! This tool allows you to analyze text and gain insights about its composition and characteristics. Simply enter or paste the text you want to analyze into the text input field, and click on the 'Analyze' button.
</p><p>
The Text Analyzer provides various features to help you understand the text better. It can calculate the total number of words, sentences, and paragraphs in the text. It can also determine the average word length and the most frequent words used. Additionally, it can perform sentiment analysis to assess the overall sentiment of the text.
        </p>
        <div className='d-flex justify-content-center justify-content-evenly'>
          <div className='card px-3 py-3'><h4 className='d-flex justify-content-center'><FaUser /></h4><Link to="/login">Click to Login</Link></div>
          <div className='card px-3 py-3'><h4 className='d-flex justify-content-center'><FaUserPlus /></h4><Link to="/signup">New User Sign up</Link></div>
          </div>
        </>
      )}
    </div>
  );
}
