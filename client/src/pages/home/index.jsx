import React, { useEffect, useState, useContext } from 'react';
import { getMovies } from '../../api/movies';
import { NavLink, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import axios from 'axios';
import '../../styles/homepage.css';

const HomePage = () => {
  const [data, setData] = useState(null);
  const { type } = useParams();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function getMoviesData() {
      const moviesData = await getMovies();
      if (moviesData) {
        if (user) {
          const userFavoritesResponse = await axios.get('/get-favorites', { withCredentials: true });
          const favoriteMovies = userFavoritesResponse.data.favoriteMovies || [];
          console.log(favoriteMovies)
          const moviesWithFavorites = moviesData.results.map(movie => ({
            ...movie,
            isFavorite: favoriteMovies.includes(movie.id)
          }));
          console.log(moviesWithFavorites);
          setData({ ...moviesData, results: moviesWithFavorites });
        } else {
          setData(moviesData);
        }
      }
    }

    getMoviesData();
  }, [type, user]);

  const handleFavoriteToggle = async (movieId) => {
    if (user) {
      const isFavorite = data.results.find(movie => movie.id === movieId).isFavorite;
      if (isFavorite) {
        await axios.post('/remove-favorite', { movieId }, { withCredentials: true });
      } else {
        await axios.post('/add-favorite', { movieId }, { withCredentials: true });
      }

      setData(prevData => ({
        ...prevData,
        results: prevData.results.map(movie =>
          movie.id === movieId ? { ...movie, isFavorite: !movie.isFavorite } : movie
        )
      }));
    } else {
      alert('Please log in to manage your favorite movies.');
    }
  };

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page">
      {data.results.length ? (
        <div className="grid">
          {data.results.map(movie => (
            <div key={movie.id} className="movie-container">
              <NavLink
                to={`movie/${movie.id}`}
                className="movie"
              >
                <article>
                  <div className="movie-image-container">
                    {movie.poster_path ? (
                      <img
                        className="movie-image"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    ) : (
                      <img
                        className="movie-image"
                        src='/missing-movie.png'
                        alt="Missing movie"
                      />
                    )}
                  </div>
                  <h3>{movie.title}</h3>
                  <p>Release Date: {movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                </article>
              </NavLink>
              <button
                className={`favorite-button ${movie.isFavorite ? 'favorite' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleFavoriteToggle(movie.id);
                }}
              >
                &#x2764;
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="prompt">No movies available now.</p>
      )}
    </div>
  );
};

export default HomePage;
