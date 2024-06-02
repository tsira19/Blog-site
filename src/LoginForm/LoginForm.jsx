import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AuthComponent = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const formFields = [
    {
      id: 1,
      name: 'user',
      type: 'text',
      placeholder: 'Username',
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'pwd',
      type: 'password',
      placeholder: 'Password',
      label: 'Password',
      required: true,
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://apitest.reachstar.io/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: pwd }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('success', true);
        navigate('/news', { state: { email: user } });
      } else {
        const result = await response.json();
        setAuthError(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setAuthError('An error occurred. Please try again later.');
    }
  };

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    setUser('');
    setPwd('');
    setAuthError('');
  };
const linkStyles = {
    textDecoration: 'none',
    color: 'blue',
    fontSize: '16px' 
  };

  return (
    <div className="auth-container">
      {!isAuthenticated ? (
        <div>
          {authError && <p className="error-message">{authError}</p>}
          <form className="login-form" onSubmit={handleFormSubmit}>
          <h2>Login</h2>
            {formFields.map((field) => (
              <div key={field.id}>
                <label>{field.label}</label><br />
                <input
                  type={field.type}
                  value={field.name === 'user' ? user : pwd}
                  onChange={(e) => field.name === 'user' ? setUser(e.target.value) : setPwd(e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  pattern={field.pattern}
                  style={{ width: '100%' }} 
                />
                <br />
              </div>
            ))}
            <div className="login-container">
              <p className="account">Don't have an account?</p>
              <Link style={linkStyles} to="/Register">Register</Link>
            </div>
            <button className="submit" type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user}!</h2>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;