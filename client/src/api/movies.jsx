const tmdbKey = '362d74b235448be897e840a36a95aa5c';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const requestParams = `?api_key=${tmdbKey}`;

export const getMovies = async () => {
  const genreRequestEndpoint = 'movie/popular';
  const urlToFetch = `${tmdbBaseUrl}/${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('Fetching movies failed:', error);
    return null;
  }
};

export const getMovieDetails = async (id) => {
  const genreRequestEndpoint = `movie/${id}`;
  const urlToFetch = `${tmdbBaseUrl}/${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Fetching movie details failed:', error);
    return null;
  }
};


export const getRating = async (id) => {
  const genreRequestEndpoint = `movie/top_rated`;
  const urlToFetch = `${tmdbBaseUrl}/${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Fetching movie details failed:', error);
    return null;
  }
};


export const getGenres = async () => {
  const genreRequestEndpoint = `genre/movie/list`;
  const urlToFetch = `${tmdbBaseUrl}/${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Fetching movie details failed:', error);
    return null;
  }
};

export const getByGenre = async (id) => {
  const requestParamsEnd = `&with_genres=${id}`;
  const genreRequestEndpoint = `discover/movie`;
  const urlToFetch = `${tmdbBaseUrl}/${genreRequestEndpoint}${requestParams}${requestParamsEnd}`;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Fetching movie details failed:', error);
    return null;
  }
};

export const getListOfMovieDetails = async (favIds) => {
  const fetchMovieDetails = async (id) => {
    const genreRequestEndpoint = `movie/${id}`;
    const urlToFetch = `${tmdbBaseUrl}/${genreRequestEndpoint}${requestParams}`;
    try {
      const response = await fetch(urlToFetch);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Fetching movie details failed:', error);
      return null;
    }
  };

  // Fetch details for all favorite movie IDs
  const movieDetailsPromises = favIds.map(id => fetchMovieDetails(id));
  const movieDetailsList = await Promise.all(movieDetailsPromises);

  // Filter out any null results
  const validMovieDetailsList = movieDetailsList.filter(details => details !== null);
  return validMovieDetailsList;
};


