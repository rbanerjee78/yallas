import React, { useState } from 'react';
import { useNavigate } from 'react-router';



const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://5f72af646833480016a9be8c.mockapi.io/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        //console.log('Login successful! Token:', token);
        localStorage.setItem('token', token)
        window.location.href = '/textanalyzer';
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed!');
      }
    } catch (error) {
      //console.log('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h5>Login</h5>
      <div className='form-group mb-3'>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          className='form-control'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group mb-3'>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className='form-control'
          required
        />
      </div>
      <button type="submit" className='btn btn-primary btn-sm'>Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
