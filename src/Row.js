import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl, {
          headers: {
            'Authorization': 'Bearer 11d38f2c05853ae679f0aa74cf9a24e1',
            'Content-Type': 'application/json'
          }
        });
        setMovies(request.data.results);
        return request;
      } catch (error) {
        // Handle error appropriately (e.g., show error message, retry, etc.)
      }
    }
    fetchData();
  }, [fetchUrl]);

  // console.log(movies);

  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className='row__posters'>
        {movies.map((movie) => (
          ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            <img
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              key={movie.id}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name || movie.title}
            />
          )
        ))}
      </div>
    </div>
  );
}

export default Row;
