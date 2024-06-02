import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Layout from './Layout';

const AddBlog = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('success');
    if (!isLoggedIn) {
      //navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!blogTitle.trim() || !blogDescription.trim()) {
      alert('Both title and description are required.');
      return;
    }

    try {
      const blogData = { title: blogTitle, description: blogDescription };
      await axios.post('https://apitest.reachstar.io/blog/add', blogData);
      navigate('/Home');
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('Failed to submit blog. Please try again later.');
    }
  };

  return (
    <div>
      <Layout/>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center pt-4">Create Post</h2>
          <form onSubmit={handleSubmit}>
            <div className='d-flex justify-content-center gap-4 pb-5 pt-3'>
              <div className="form-group">
                <label htmlFor="blogTitle">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="blogTitle"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="blogDescription">Description:</label>
                <textarea
                  className="form-control"
                  id="blogDescription"
                  rows="5"
                  value={blogDescription}
                  onChange={(e) => setBlogDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center gap-4 pb-5 pt-3">
              <button type="submit" className="btn btn-success btn-lg" style={{ width: '150px' }}>Submit</button>
              <Link to="/Home" className="btn btn-danger btn-lg" style={{ width: '150px' }}>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AddBlog;