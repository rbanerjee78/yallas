import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const Signup = () => {
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const validationErrors = validateFormData(formData);
    
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setLoading(false);
    return;
  }

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
        setSuccessMessage('Signup successful!'); 
        setErrors({});
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password: '',
        }); 
        setLoading(false);      
      } else {
        console.log('Signup failed!');
      }
    } catch (error) {
      console.log('Error:', error);
    } 
  };


  const validateFormData = (data) => {
    const errors = {};
  
    if (data.first_name.trim() === '') {
      errors.first_name = 'First name is required';
    }
    if (data.last_name.trim() === '') {
      errors.last_name = 'Last name is required';
    }
    if (data.email.trim() === '') {
      errors.email = 'Email is required';
    }
    if (data.password === '') {
      errors.password = 'Password is required';
    }
    if (data.confirm_password === '') {
      errors.confirm_password = 'Confirm password is required';
    }
  
    if (data.password !== data.confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }
  
    return errors;
    
  };

  return (
    <>
   
    <form onSubmit={handleSubmit}>
    <h5>Sign Up</h5>
    
    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
    {loading && (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )} {/* Display the loading spinner only when there are no errors */}
    <div className=' mb-3 d-grid'>  <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className='form-control'
      />
            {errors.first_name && <span className='text-danger fs-6'>{errors.first_name}</span>} {/* Display the error message */}

      </div>
     
      <div className=' mb-3 d-grid'> <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className='form-control'
      />
            {errors.last_name && <span className='text-danger fs-6'>{errors.last_name}</span>} {/* Display the error message */}

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

{errors.email && <span className='text-danger fs-6'>{errors.email}</span>} {/* Display the error message */}

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

{errors.password && <span className='text-danger fs-6'>{errors.password}</span>} {/* Display the error message */}

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
 {errors.confirm_password && <span className='text-danger fs-6'>{errors.confirm_password}</span>} {/* Display the error message */}

     </div>
      <button type="submit" className='btn btn-primary btn-sm'>Sign Up</button>
    </form>
    </>
      );
};

export default Signup;
