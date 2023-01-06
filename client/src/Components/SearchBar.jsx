import React, { useState } from 'react';
import { findCountry } from '../Redux/action'
import { useDispatch } from 'react-redux'
import style from '../Styles/SearchBar.module.css'

function SearchBar() {

  const dispatch = useDispatch()
  const[searchCountry, setSearchCountry] = useState('')


    return (

        <form onSubmit={(e) => {
          e.preventDefault();

          if(!searchCountry) alert("Enter a country")
          else if(searchCountry[0] !== " ")dispatch(findCountry(searchCountry))
         

          setSearchCountry("")
        }}>
       
       <main>
          <div className={style.SearchBox}>

              <input type="text" className={style.input} placeholder="Search Country..."

                value={searchCountry}

                onChange= {e => { 
                  setSearchCountry(e.target.value)
                  dispatch(findCountry(e.target.value))

                }}
                
              />
              <button type="submit"><i className="material-icons">search</i> </button>
          </div>
        </main>
      </form>
      
      
    );
}

export default SearchBar;