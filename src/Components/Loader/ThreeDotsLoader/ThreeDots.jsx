import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import style from './ThreeDots.module.css'

 function ThreeDotsLoader() {
  return (
    
      <div  className={style.loader_overlay}>
        <ThreeDots
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          visible={true}
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    
  ) 
}
export default ThreeDotsLoader
