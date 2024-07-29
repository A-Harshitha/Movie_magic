import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../../api/movies';
import { Navigate, useParams } from 'react-router-dom';
import '../../styles/MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getMovieData() {
      try {
        const movieData = await getMovieDetails(id);
        setData(movieData);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    getMovieData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <div>
          <Navigate to='/movie-details-not-found'/>
        </div>
      ) : (
        <main>
          <div className="movi-detail">
            <div className="movi-image-container">
              <img
                className="movi-image"
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    : 'https://i.imgur.com/aEcJUFK.png'
                }
                alt={data.title}
              />
            </div>
            <div className="movi-info">
              <h1>{data.title}</h1>
              <p><strong>Tagline:</strong> {data.tagline}</p>
              <p><strong>Release Date:</strong> {data.release_date}</p>
              <p><strong>Genres:</strong> {data.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>Overview:</strong> {data.overview}</p>
              <p><strong>Runtime:</strong> {data.runtime} minutes</p>
              <p><strong>Rating:</strong> {data.vote_average} ({data.vote_count} votes)</p>
              <p><strong>Budget:</strong> ${data.budget.toLocaleString()}</p>
              <p><strong>Revenue:</strong> ${data.revenue.toLocaleString()}</p>
              <p><strong>Production Companies:</strong> {data.production_companies.map(company => company.name).join(', ')}</p>
              <p><strong>Homepage:</strong> <a href={data.homepage} target="_blank" rel="noopener noreferrer">{data.homepage}</a></p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default MovieDetailsPage;
