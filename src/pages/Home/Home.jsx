import React from 'react';
import movies from '../../Components/Movies/movies';
import style from './Home.module.css'
import { Link } from "react-router-dom";
import MovieDetails from '../../Components/MovieDetails/MovieDetails';

export default function Home() {
  return (
    <div>
      <ul className={style.wrapper_movieimage}>
        {
          movies.map((movie) => {
            return (
                <Link to={`/movie/${movie.id}`}>
                <img src={movie.image} alt={movie.title} />
              </Link>
            );
          })
        }
      </ul>
    </div>
  );
}
