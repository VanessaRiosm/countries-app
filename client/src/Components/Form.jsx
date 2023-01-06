import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'  
import {createActivity} from '../Redux/action'
import {useHistory} from 'react-router'
import style from '../Styles/Form.module.css'
import {getCountries, findActivity} from '../Redux/action'


function Form() {

    const allCountries = useSelector(state => state.copyCountries)
    const allActivities = useSelector(state => state.activities)
    const refresh2 = useSelector(state => state.refresh2)
    const dispatch = useDispatch()
    const history = useHistory()
    const [data, setData] = useState({name: "", difficulty:"", duration:"", season:"", countries:[]})
    const [errors, setErrors] = useState({nameError:"", difficultyError:"", durationError:"", seasonError:"", countriesError:""})
    const [seeCountries, setSeeCountries] = useState([])
    const difficulty = ["1", "2", "3", "4", "5"]
    const season = ["Summer", "Winter", "Spring", "Autumn"]
   

    function backToHome(){
        history.goBack(-1)
      }


    function deleteCountry(value){

        let countryToDelete = allCountries.find(e => e.name === value)
        let id = countryToDelete.id

        setSeeCountries(seeCountries.filter(e => e !== value))
        setData({...data, countries: data.countries.filter(e => e !== id)})

    }
    

    const handleChangeName = (value) =>{

        if(!value) setErrors({...errors, nameError:"Please enter a name"})
        else if(!/^[A-Za-z0-9]+$/g
        .test(value)) setErrors({...errors, nameError:"characters not allowed"})
        else if (value.length < 3 || value.length >= 10) setErrors({...errors, nameError:"Name must be between 3 and 10 characters"})
         
        
        else{
            setErrors({...errors, nameError: ""})   
            setData({...data, name: value})
        }

    }


    const handleChangeDifficulty = (value) =>{

        if(!value || value === "Select Difficulty") setErrors({...errors, difficultyError:"Please select a Difficulty"})
        
        else{
            setErrors({...errors, difficultyError: ""})   
            setData({...data, difficulty: value})
        }

    }


    const handleChangeDuration = (value) =>{

        if(!value || value <= 0 || value >= 8760) setErrors({...errors, durationError:"Please enter a valid duration"})
        
        else{
            setErrors({...errors, durationError: ""})   
            setData({...data, duration: value})
        }
    }



    const handleChangeSeason = (value) =>{

        if(!value || value === "Select Season") setErrors({...errors, seasonError:"Please select a season"})
        
        else{
            setErrors({...errors, seasonError: ""})   
            setData({...data, season: value})
        }

    }


    const handleChangeCountries = (value) =>{

         if(value !== "Select Countries") {

            let country = allCountries.find(c => c.id === value)
            let countryExist = seeCountries.find(c => c === country.name)

            if(!countryExist){
                setData({...data, countries: [...data.countries, value]})
                setSeeCountries([...seeCountries, country.name])
            }else{
                alert("the country was already selected")
            }

         }

         if(data.countries.length <= 0) setErrors({...errors, countriesError: "Please select a Country"})

         setErrors({...errors, countriesError: ""})   

    }


    const handleSubmit = (e) =>{

        e.preventDefault()

        if(data.countries){
            setErrors({...errors, countriesError: "Select at least one country"})
        }

        if(!data.season){
            setErrors({...errors, seasonError: "Complete the season field"})
        }

        if(!data.duration){
            setErrors({...errors, durationError: "Complete the duration field"})
        }
       
        if(!data.difficulty){
            setErrors({...errors, difficultyError: "Complete the difficulty field"})
        }

        if(!data.name){
            setErrors({...errors, nameError: "Complete the name field"})
        }


        else if(!errors.nameError && !errors.difficultyError && !errors.durationError && !errors.seasonError && !errors.countriesError){


                if(data.name && data.difficulty && data.duration && data.season && data.countries.length){
                   
                    
                    const activityExist = allActivities.find(a => a.name.toLowerCase() === data.name.toLowerCase())
                    
                    if(activityExist){
                        alert("The activity already exists. please add a different activity")
                        setErrors({...errors, nameError: "Put a different name"})

                    } else{

                        dispatch(createActivity(data))
                        alert("the activity was succesfully added")
                        backToHome()
                    }

                }
            }
        }  
    

    useEffect(() => {
        dispatch(getCountries())
        dispatch(findActivity())
 
    }, []);


    return (

        <div className={style.div}>

        <div className={style.allcontent}>
            <div className={style.title}>
                <h1>NEW ACTIVITY</h1>
            </div>

            <div>
                <button onClick={() => backToHome()} className={style.backbtn}> <i className="material-icons">chevron_left</i>Back</button>
            </div>
        

            <div className={style.div2}>

            <form onSubmit={handleSubmit}>


                <br/><label className={style.name} >Activity's Name</label><br/>
                <input type={'text'} onChange={(e)=> handleChangeName(e.target.value)} placeholder="Name" className={style.content}/><br/>
                <span style={{color:"red"}}>{errors.nameError}</span> <br/>

    


                <label className={style.name} >Difficulty</label><br/>
                <select name="continents" onChange={(e) => handleChangeDifficulty(e.target.value)} className={style.select}>
                <option value="Select Difficulty" selected> Select Difficulty </option>
                {difficulty.map(c => <option value={c}> {c} </option>)}
            </select> <br/>
            <span style={{color:"red"}}>{errors.difficultyError}</span> <br/>



            <label className={style.name} >Duration in hours</label><br/>
                <input type={'number'} onChange={(e)=> handleChangeDuration(e.target.value)} placeholder="Duration in hours" min="1" max="8760" className={style.content}/><br/>
                <span style={{color:"red"}}>{errors.durationError}</span> <br/>



                <label className={style.name} >Season</label><br/>
                <select name="season" onChange={(e) => handleChangeSeason(e.target.value)} className={style.select}>
                <option value="Select Season" selected> Select Season </option>
                {season.map(c => <option value={c}> {c} </option>)}
            </select> <br/> 
            <span style={{color:"red"}}>{errors.seasonError} </span> <br/>



            <label className={style.name} >Countries</label><br/>
                <select name="continents" onChange={(e) => handleChangeCountries(e.target.value)} className={style.select}>
                <option value="Select Countries" selected> Select Countries </option>
                {allCountries.map(c => <option value={c.id}> {c.name} </option>)}
            </select>  <br/>
            <span style={{color:"red"}}>{errors.countriesError} </span> 

            <br/>
            

            <div className={style.countriesList}>
                {seeCountries.length ? seeCountries.map(e =>

                    <div className={style.countries}>
                        <button className={style.xbutton} onClick={() => deleteCountry(e)}><i className="material-icons">close</i> </button>
                        {e} 
                    </div>


                ): null}
            </div>
            <br/>
            
                <button type='submit' className={style.btn}> Done </button><br/>
            </form> 
            </div>
            </div>
        </div>
    )
    
}

export default Form;