import React, {useEffect}from 'react'
import {useParams, useHistory} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {getCountry, clearCountry} from '../Redux/action'
import style from '../Styles/CountryDetails.module.css'


function CountryDetails () {

  const history = useHistory()
  const {id} = useParams()
  const dispatch = useDispatch()
  const country = useSelector(state => state.country)


  function backToHome(){
      history.goBack(-1)
    }

  useEffect(() => {
    dispatch(getCountry(id))

    return () => dispatch(clearCountry())

    }, [id]);

    
    
  return(

    <div className={style.div}>
      <div className={style.background}>
 
        <div>
          <button onClick={() => backToHome()} className={style.btn}> <i className="material-icons">chevron_left</i> Back</button>
        </div>


        <h1 className={style.name}> {country.name} </h1> 
        <div className={style.detailContainer}>
          <img className={style.flag} src={country.image} alt="Country"/>

          <div className={style.details}>

          <h2>Country Details</h2>
            <h4> Code: {country.id} </h4> 
            <h4> Continent: {country.continent} </h4>
            <h4> Capital: {country.capital} </h4>
            <h4> Subregion: {country.subRegion} </h4>
            <h4> Area: {country.area} Km² </h4>
            <h4> Population: {country.population}</h4>
          </div>
        </div>


        <h2 style={{color:"white"}}> Activities </h2>
       <div  className={style.activity}>
          
        {country.activities !== undefined && country.activities.length ? country.activities.map(a => (
          <div>
          
            <h4>Name: {a.name}</h4>  
            <h4>Difficulty: {a.difficulty}/5</h4>
            <h4>Duration: {a.duration === "1" ? a.duration + " hour" : a.duration + " hours"} </h4>
            <h4>Season: {a.season} </h4>
          
          </div>
        )) : "No Activities"} 
          
        </div>
      </div>
    </div>
  )
}

export default CountryDetails;