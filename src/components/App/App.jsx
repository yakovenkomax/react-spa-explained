import React from 'react';
import starImage from './images/star.png';
import s from './App.module.css';

const App = () => {
  return (
    <div className={s.app}>
      <img className={s.image} src={starImage} alt="star" />
      <div className={s.text}>Hello World!</div>
    </div>
  );
}

export default App;
