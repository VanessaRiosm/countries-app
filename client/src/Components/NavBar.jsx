import React from 'react';
import SearchBar from './SearchBar'
import style from '../Styles/NavBar.module.css'

function NavBar() {

    return (
        <div className={style.backgroundImage}>
          <img src='./image.png' className={style.image}></img>
          <SearchBar/>
        </div>
    );
}

export default NavBar;