import React from 'react';
import {Link} from 'react-router-dom'
import style from '../Styles/Country.module.css'

function Country(props) {

    return (

      <div className={style.card}>
      <Link to={`/country/${props.id}`} className={style.link}> 
        <img src={props.image} className={style.img} alt="Country flag"/>

        <h4 className={style.countryName}>{props.name}</h4><br/>
        <br/>
        <h4> {props.continent}</h4>
        <h4> Population: {props.population}</h4>
      </Link>
      </div>
    );
    
}

export default Country;