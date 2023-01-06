import {GET_COUNTRIES, FIND_COUNTRY, FILTER_CONTINENT, FILTER_ORDER, FILTER_ACTIVITY, GET_COUNTRY, FIND_ACTIVITY, CREATE_ACTIVITY, CLEAR_COUNTRY, LAST_PAGE} from './actionTypes';

const initialState = {
    countries: [],
    copyCountries: [],
    country: {},
    activities: [],
    currentPage: 1,
    refresh: true,
    refresh2: true,
    lastPage: 0

}

export default function reducer(state = initialState, {type, payload}){

    switch(type){

        case GET_COUNTRIES: 

            return{
                ...state,
                countries: payload.data,
                copyCountries: payload.data
            }

        case FIND_COUNTRY:


            return{
                ...state,
                countries: payload.data.length === 0 ? "text" : payload.data              

            }
        
        case CLEAR_COUNTRY:

            return{
                ...state,
                country: {}
            }


        case FILTER_CONTINENT:
 
            return{
                ...state,
                countries: payload !== "All continents" ? state.copyCountries.filter(c => c.continent === payload) : state.copyCountries,
                refresh: !state.refresh

            }
        
        case FILTER_ORDER:
             
            return {
                ...state,
                countries: payload === "asc" ? 
                
                        state.countries.sort(function(a,b) {
                        if (a.name>b.name) return 1;
                        else return -1; })
                    
                    : payload === "des" ?

                        state.countries.sort(function(a,b) {
                            if (b.name>a.name) return 1;
                            else return -1;
                        })
        
                    : payload === "MinToMax" ? 

                        state.countries.sort(function(a, b) {
                            return a.population - b.population;
                        })
                        
                    : payload === "MaxToMin" ? 
                        state.countries.sort(function(a, b) {
                            return b.population - a.population;
                        })

                    : state.copyCountries,
                    refresh: !state.refresh
                    
            }

        case FIND_ACTIVITY:

            return{
                ...state,
                activities: payload.data

            }
        
        case LAST_PAGE: 

        console.log("el reducer recibe " + payload)
            return{
                ...state,
                lastPage: payload
                
            }

        case FILTER_ACTIVITY: 

            return {
                ...state,
                countries: payload.data[0].countries,
                refresh: !state.refresh
            }

        case GET_COUNTRY:

            return{
                ...state,
                country: payload.data[0]

            }
        
        case CREATE_ACTIVITY: 

            return{

                ...state,
                refresh2: !state.refresh2
            }
        
        
        default:
            return{
                ...state
            }
            
    }

}