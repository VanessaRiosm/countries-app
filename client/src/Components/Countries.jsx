import React, {useEffect, useState} from 'react';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux'
import Country from './Country'
import {getCountries, lastPage} from '../Redux/action'
import style from '../Styles/Countries.module.css'


function Countries() {

  const dispatch = useDispatch()
  const refresh = useSelector(state => state.refresh)
  const finalPage = useSelector(state => state.lastPage)
  const countriesState = useSelector(state => state.countries)
  const [pagination, setPagination] = useState([])
  const [currentCountries, setcurrentCountries] = useState()
  const [currentPage, setCurrentPage] = useState(1)


  let result = Math.ceil(countriesState.length / 10)
 
  function getPagination(){

    let count = []

    for (let i = 1; i <= result; i++) {
      count.push(i)
    }
   setPagination(count)
  }


  function handlePagination(num){

    if(num === 1) setcurrentCountries(countriesState.slice(0,9))
    else setcurrentCountries(countriesState.slice(num * 10 - 11, num * 10 - 1))

  }



  useEffect(() => {

    handlePagination(1)
    setCurrentPage(1)

  
  }, [refresh]);





  useEffect(() => {


    getPagination()


  //     if(finalPage > 1){

  //     console.log("entra al if del final page")
  //     handlePagination(finalPage)
  //     setCurrentPage(finalPage) 
  //   }

  //   else {

  //   console.log("entra al else del final page")
  //     handlePagination(1)
  //     setCurrentPage(1) 
  //  }


    handlePagination(1)
    setCurrentPage(1)
    if(!countriesState.length) {  
      dispatch(getCountries())
      
    }
    
    // return () => {
    //    console.log(pagination)
    //   dispatch(lastPage(currentPage))

    // }

    
  }, [countriesState]);

 


  
  return (

        <div>
          
          <div className={style.containter}>
    
            <div className={style.cards}>
            {/* { console.log("el current page es " + currentPage)} */}
              {  currentCountries === "text" ? <div> <h1> COUNTRY NOT FOUND </h1> </div> 
              
              :  
              
              currentCountries && currentCountries.map(c => (
                  <Country 
                      key={c.id}
                      id={c.id}
                      name={c.name}
                      image={c.image}
                      continent={c.continent}
                      population={c.population}
                  />
                ))
              }


              </div>
            </div>

            <div>
            <button onClick={() => {handlePagination(currentPage -1); setCurrentPage(currentPage -1)}}disabled={currentPage===1} style={currentPage===1 ? {color:"gray", cursor:"not-allowed", fontWeight:'bold'}: {color:"blue", fontWeight:'bold'}}> {`<< Prev`} </button> 


            {pagination.map(num => {return <button key={num+"a"} className={`${style.btn} ${currentPage ===num ? style.btn2 : style.btn3}`} onClick={() => {handlePagination(num); setCurrentPage(num)}}> {num} </button>})}


            <button onClick={() => {handlePagination(currentPage + 1); setCurrentPage(currentPage + 1)}}disabled={currentPage === result} style={currentPage===result ? {color:"gray", cursor:"not-allowed", fontWeight:'bold'}: {color:"blue", fontWeight:'bold'}} > {`Next >>`} </button>

          </div>
        </div>

    );
}

export default Countries;