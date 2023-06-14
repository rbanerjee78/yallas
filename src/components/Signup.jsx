import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const Signup = () => {
  
  const [successMessage, setSuccessMessage] = useState('');


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        setSuccessMessage('Signup successful!'); // Set success message       
      } else {
        console.log('Signup failed!');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
   
    <form onSubmit={handleSubmit}>
    <h5>Sign Up</h5>
    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}

    <div className=' mb-3 d-grid'>  <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className='form-control'
      />
      </div>
     
      <div className=' mb-3 d-grid'> <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className='form-control'
      />
    </div>

    <div className=' mb-3 d-grid'> 
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className='form-control'
      />
     </div>
     <div className=' mb-3 d-grid'> 
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className='form-control'
      />
     </div>
     <div className=' mb-3 d-grid'> 
      <input
        type="password"
        name="confirm_password"
        placeholder="Confirm Password"
        value={formData.confirm_password}
        onChange={handleChange}
        className='form-control'
      />
     </div>
      <button type="submit" className='btn btn-primary btn-sm'>Sign Up</button>
    </form>
    </>
      );
};

export default Signup;
