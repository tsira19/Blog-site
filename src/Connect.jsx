import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Layout from './Layout';

const ConnectForm = () => {
  const initialFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    const isSuccess = localStorage.getItem('success');
    if (!isSuccess) {
      //window.location.assign('/');
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(formData);
    updateFormData(initialFormData);
  };

  return (
    <>
    <Layout/>
    <div  className='auth-container'> 
    <div className="login-form">
      <h2>Contact Us , We are waiting for you!</h2>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <br></br>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <button  className='submit'  type="submit">Submit</button>
      </form>
    </div>
    </div>
      <Footer/> 
    </>
  );
};

export default ConnectForm;
