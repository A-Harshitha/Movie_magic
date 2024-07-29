import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import DetailsPage from './pages/detail';
import TopRated from './pages/rated';
import Root from './components/root';
import Register from './pages/Register';
import Login from './pages/Login';
import Genre from './pages/genre';
import WatchList from './pages/watchlist';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';


axios.defaults.baseURL = 'https://moviemagic-api.vercel.app';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster   toastOptions={{ duration: 2000 }}
        containerStyle={{
          position: 'fixed',
           top: '630px',  
          left: '50%',     
          transform: 'translateX(-50%)', 
          zIndex: 1000,    
        }}
      />
      <Routes>
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
        <Route path="/" element={<Root />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<DetailsPage />} />
          <Route path="top-rated" element={<TopRated />} />
          <Route path="top-rated/movie/:id" element={<DetailsPage />} />
          <Route path="genre" element={<Genre/>}/>
          <Route path="genre/movie/:id" element={<DetailsPage />} />
          <Route path="favourites" element={<WatchList/>}/>
          <Route path="favourites/movie/:id" element={<DetailsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
