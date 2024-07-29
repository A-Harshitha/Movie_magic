import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import movieLogo from '../assets/logo.svg';
import '../styles/Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post('/register', {
        name,
        email,
        password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: '', email: '', password: '' });
        toast.success('Registration Successful!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <img src={movieLogo} alt="Logo" /> 
      </div>
      <form className="register-form" onSubmit={registerUser}>
        <h2>Register</h2>
        <label>Name</label>
        <input
          type='text'
          placeholder='Name'
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
        <label>Email</label>
        <input
          type='email'
          placeholder='Email'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        <label>Password</label>
        <input
          type='password'
          placeholder='Password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <button type='submit'>Register</button>
      </form>
      <div className="login-link">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}
