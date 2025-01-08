import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../Movies/movies";
import style from "./MovieDetails.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { IoPlay } from "react-icons/io5";
import Footer from "../Footer/Footer";
export default function MovieDetails() {
  const navigate = useNavigate();

  function home() {
    navigate("/signin");
  }
  function goBack() {
    navigate("/");
  }
  function watchMovie(){
    navigate('/movie-playing')
  }
  const loggedIn = useSelector((state) => state.users.loggedIn);

  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <>
    <div className={style.movie_details}>
      <span onClick={goBack}>
        <IoMdArrowBack />
      </span>
      <div className={style.movie_wrapper}>
        <h1>{movie.title}</h1>
        <img src={movie.image} alt={movie.title} className={style.movie_poster}/>
        <p>
          <strong>Year:</strong> {movie.year}
        </p>
        <p>
          <strong>Duration:</strong> {movie.time}
        </p>
        <p>
          <strong>Description:</strong> {movie.desc}
        </p>
        {loggedIn ? (
          <button className={style.btn} onClick={watchMovie}>Watch Now</button>
        ) : (
          
          <button className={style.btn} onClick={home}>
            <em>
            <IoPlay />
            </em>
            Subscribe to Watch
          </button>
        )}
        
      </div>
    
     
    </div>
    <div>
    <Footer/>
    </div>
    </>
  );
}
