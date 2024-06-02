import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        password: false,
    });

    const formFields = [
        {
            id: 'username',
            type: 'text',
            placeholder: 'Username',
            label: 'Username',
            pattern: '^[A-Za-z0-9]{3,16}$',
            errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
            required: true,
        },
        {
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email',
            required: true,
        },
        {
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            label: 'Password',
            required: true,
        },
    ];

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            [id]: true,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://apitest.reachstar.io/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsRegistered(true);
            } else {
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            {isRegistered ? (
                <div>
                    <h2>Registration Successful!</h2>
                    <Link to="/Login">Login</Link>
                </div>
            ) : (
                <div>
                    <h2>Register</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form className="register-form" onSubmit={handleSubmit}>
                        {formFields.map((field) => (
                            <div key={field.id} className="form-group">
                                <label>{field.label}</label>
                                <input
                                    id={field.id}
                                    type={field.type}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    pattern={field.pattern}
                                    style={{ width: '100%' }}
                                    onBlur={() => setTouched((prevTouched) => ({
                                        ...prevTouched,
                                        [field.id]: true,
                                    }))}
                                />
                                {touched[field.id] && !new RegExp(field.pattern).test(formData[field.id]) && (
                                    <span className="error-message">{field.errorMessage}</span>
                                )}
                            </div>
                        ))}
                        <div className="login-container">
                            <p className="account">Already have an account?</p>
                            <Link style={linkStyle} to="/Login">Login</Link>
                        </div>
                        <button className="submit" type="submit">Register</button>
                    </form>
                </div>
            )}
        </div>
    );
};

const linkStyle = {
    textDecoration: 'none',
    fontSize: '16px',
    color: 'blue',
};

export default Register;