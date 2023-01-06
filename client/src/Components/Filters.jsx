import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'  
import {filterByContinent, filterByOrder, findActivity, filterByActivity} from '../Redux/action'
import { Link } from 'react-router-dom';
import style from '../Styles/Filters.module.css'


function Filters() {

    const activities = useSelector(state => state.activities)

    const dispatch = useDispatch()

    const continents = ["Asia", "Africa", "Europe", "Oceania", "North America", "South America"]

    function handleContinentFilter(value){
        dispatch(filterByContinent(value))
    }

    function handleOrderFilter(value){
        dispatch(filterByOrder(value))
    }

    function handleActivityFilter(value){
      dispatch(filterByActivity(value))
  }


  useEffect(() => { 
    dispatch(findActivity())
  }, []);



    return (

      <div>
        <div className={style.principaldiv}>



            <select name="continents" className={style.select} onChange={(e) => handleContinentFilter(e.target.value)}>
              <option value="Default" disabled selected>Order by Continent</option>
              <option value="All continents"> All Continents </option>
              {continents.map(c => <option value={c}> {c} </option>)}
          </select>

          <select name="order" className={style.select} onChange={(e) => handleOrderFilter(e.target.value)}>
              <option value="Default" disabled selected> Order By </option>
              <option value="asc">A - Z</option>
              <option value="des">Z - A</option>
              <option value="MinToMax">Population Min-Max</option>
              <option value="MaxToMin">Population Max-Min</option>
          </select>


          <select name="activities" className={style.select} onChange={(e) => handleActivityFilter(e.target.value)}>
              <option value="All activities" disabled selected> Order By Activities </option>
              {activities.map(a => <option value={a.name}> {a.name} </option>)}
          </select>


          <button onClick={() => window.location.reload()} className={style.btn}> Clear Filters </button>

      </div>

      <div>

      <button className={style.btn2}> <Link to={'/form'} className={style.link}> Add Activity <i className="material-icons">add_circle</i> </Link> </button>

      </div> 

    </div>
    );
    
}

export default Filters;