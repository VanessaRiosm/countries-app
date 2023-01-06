import {GET_COUNTRIES, FIND_COUNTRY, LAST_PAGE, FILTER_CONTINENT, FILTER_ORDER, FILTER_ACTIVITY, GET_COUNTRY, FIND_ACTIVITY, CREATE_ACTIVITY, CLEAR_COUNTRY} from './actionTypes'
import axios from 'axios'

const url = process.env.REACT_APP_URL

export const getCountries = () => {

    return function(dispatch){
        
        fetch(`${url}/countries`)
            .then((res) => res.json())
                .then((data) =>  dispatch({type: GET_COUNTRIES, payload: {data}}))

    .catch(error => console.log(error));

    } 
}


export const findCountry = (name) => {

    return function(dispatch){
        
        fetch(`${url}/countries?name=${name}`)
            .then((res) => res.json())
                .then((data) =>  dispatch({type: FIND_COUNTRY, payload: {data}}))

        .catch(error => console.log(error));
    } 
}


export const getCountry = (id) => {

    return function(dispatch){
        
        fetch(`${url}/countries/${id}`)
            .then((res) => res.json())
                .then((data) =>  dispatch({type: GET_COUNTRY, payload: {data}}))

        .catch(error => console.log(error));
    } 
}


export const findActivity = () => {

    return function(dispatch){
        
        fetch(`${url}/activities/findactivity`)
            .then((res) => res.json())
                .then((data) =>  dispatch({type: FIND_ACTIVITY, payload: {data}}))

        .catch(error => console.log(error));
    } 
}


export const filterByActivity = (value) => {

    return function(dispatch){
      
        fetch(`${url}/activities/filteractivity?name=${value}`)
            .then((res) => res.json())
                .then((data) =>  dispatch({type: FILTER_ACTIVITY, payload: {data}}))

        .catch(error => console.log(error));
    } 
}


export const createActivity = (value) => {

    return function(dispatch){

         axios.post(`${url}/activities/`, value)

          .then((response) => dispatch({type: CREATE_ACTIVITY, payload: response.data}))


          .catch(function (error) {
            console.log( error);
          });

    } 
}


export const filterByContinent = (value) => {

    return {
        type: FILTER_CONTINENT,
        payload: value
      }

}

export const clearCountry = () => {

    return {
        type: CLEAR_COUNTRY
      }
}


export const filterByOrder = (value) => {

    return {
        type: FILTER_ORDER,
        payload: value
      }

}

export const lastPage = (num) => {

    console.log("el numero que llega por action es " + num)
    return {
        type: LAST_PAGE,
        payload: num
      }
}
