
import './App.css';
import React,{useCallback, useEffect, useState} from 'react';
import Card from './components/UI/Card';
import MovieForm from './components/Input/MovieForm';
import LoadData from './components/Display/LoadForm';


function App() {

 


//   // clearInterval(intervalID);
//   // setIntervalId("canceled")  
//   // setError("Cancelled Fetching")
// }



     //const retryForm=
 return(    
  <Card>
    <MovieForm/>
     <Card>
        <LoadData/>
     </Card>
  </Card>

 )
    

    
}

export default App;
