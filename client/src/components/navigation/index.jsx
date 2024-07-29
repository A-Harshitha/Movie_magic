import React, { useState } from 'react';
import Logo from '../../assets/logo.svg';
import Profile from '../profile';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [navTypes, setNavTypes] = useState([
    { name: 'Popular Movies', path: '/' },
    { name: 'Top-Rated Movies', path: '/top-rated' },
    { name: ' Genres' , path:'/genre'}
  ]);

  return (
    <nav>
      <div className="nav-logo">
        <NavLink to="/">
        <img src={Logo} alt="logo" />
        </NavLink>
        <Profile />
      </div>
      <ul className="nav-links">
        {navTypes.map((type) => (
          <li key={type.name}>
            <NavLink to={type.path}
              className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
            >
              {type.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
