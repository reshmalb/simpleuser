
import './App.css';
import React,{useCallback, useEffect, useState} from 'react';


function App() {
const [movies,setMovies]=useState([])
const [isLoading,setlLoading]=useState(false)
const [isError,setError]=useState(false);
const [intervalID,setIntervalId]=useState(null)

const fetchMovieHandler = useCallback(async function(){
  
    setError(null)
    setlLoading(true)
    try{    
        const response= await fetch('https://swapi.dev/api/films');  
     
        if(!response.ok){
        throw new Error('Something went wrong. retrying..');
        }
     

      const data= await response.json();   
      const transformdata=data.results.map((moviedata)=>{
        return{
             id:moviedata.episode_id,
             title:moviedata.title
              }
          })
         setMovies(transformdata)
         console.group(transformdata)
        }catch(error){
          setError(error.message);
          // if(!intervalID){
          //   console.log("retrying")
          //  clearInterval(intervalID)
          //   const interval=setInterval(() => {
          //      fetchMovieHandler();
              
          //    }, 5000);
          //    setIntervalId((p)=>interval)
          //  }
           }

          setlLoading(false)
          
        }
,[]);
useEffect(()=>{
 
    fetchMovieHandler();
 
},[fetchMovieHandler])

const onCancelFetchingHandler =()=>{
  // clearInterval(intervalID);
  // setIntervalId("canceled")  
  // setError("Cancelled Fetching")
}



     //const retryForm=
 return(
<div>


     <section style={{justifyContent:"center",marginLeft:"50%"}}>
      <button style={{backgroundColor:"orange"}} onClick={fetchMovieHandler}>fetchMovies</button>
     {isError && <button onClick={onCancelFetchingHandler}>Cancel fetching</button>}
    </section>
    <main>
    <section style={{marginLeft:"30%", marginRight:"30%",  marginTop:"3rem"}}>
      <div style={{backgroundColor:"white"}}>
    <u  style={{backgroundColor:"white"}}> Movies data </u>


         { !isLoading && movies.length>0 &&
         
         movies.map((data)=>{
        return(<li key={data.id} style={{backgroundColor:"white"}}>
          <span  style={{backgroundColor:"white"}}>{data.id}</span>
           <span style={{backgroundColor:"white"}}>{data.title}</span> </li>)
      })}
      {!isLoading && isError&& <p>{isError}</p>}

      {isLoading && <p> Loading...</p>}
      {!isLoading && movies.length===0 && !isError&&<p> No movies found...</p>}

      </div>
      </section>
      </main>
 
   
      </div>

 )
    

    
}

export default App;
