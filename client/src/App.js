import React from 'react';
import { Route, Switch  } from 'react-router-dom';
import LandingPage from './Components/LandingPage.jsx'
import Home from './Components/Home.jsx'
import CountryDetails from './Components/CountryDetails'
import Form from './Components/Form.jsx';
import './App.css';


function App() {

  return (

    <div className="App">

      <Switch>
      
        <Route exact path={'/'} component={LandingPage}/>
        <Route path={'/home'} component={Home}/>
        <Route path={'/country/:id'} component={CountryDetails}/>
        <Route path={'/form'} component={Form}/>
        <Route path={'*'} component={Form}/>
        
      </Switch>

    </div>


  );
}

export default App;
