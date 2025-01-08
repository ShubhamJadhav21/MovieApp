import React from 'react';
import style from './Movieplaying.module.css';
import ThreeDots from '../Loader/ThreeDotsLoader/ThreeDots';

export default function Movieplaying() {
  return (
    <div className={style.moviep_wrapper}>
        
      <div className={style.text_overlay}>
        <h2>Playing Movie</h2>
        <p>Your movie will start playing soon...</p>
        <ThreeDots/>
      </div>
    </div>
  );
}
