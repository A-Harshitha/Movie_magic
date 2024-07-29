import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext'; 
import '../../styles/Profile.css'; 
import profile from '../../assets/profile.png';
import axios from 'axios';

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    await axios.post('/logout');
    setUser(null);
    console.log("User signed out");
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="profile" ref={dropdownRef}>
      <button className="profile-button" onClick={handleDropdownToggle}>
        <img src={profile} alt="Profile" className="profile-pic" />
      </button>
      {isDropdownOpen && (
        <div className="profile-dropdown">
          {user ? (
            <>
              <div className="profile-name">{user.name}</div>
              <Link to="/favourites" className="profile-link" onClick={handleDropdownToggle}>
                Favourites
              </Link>
              <button className="profile-link" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="profile-link" onClick={handleDropdownToggle}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
