import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Styles/LandingPage.module.css'

function LandingPage() {

    return (
        <div className={style.backgroundImage}>
          <div >
          <Link to={'/home'}> <button className={style.btn}> ENTER </button> </Link> 
          </div>
        </div>
    );
}


export default LandingPage;


