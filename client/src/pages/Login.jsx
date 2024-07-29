import { useState, useContext } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from '../../context/userContext';
import '../styles/Login.css';
import movieLogo from '../assets/logo.svg';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: '', password: '' });
        setUser(data);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <img src={movieLogo} alt="Logo" /> 
      </div>
      <form className="login-form" onSubmit={loginUser}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type='email'
          placeholder="Enter email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
        <label>Password</label>
        <input
          type='password'
          placeholder="Enter password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <button type='submit'>Login</button>
      </form>
      <div className="login-link">
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
}
