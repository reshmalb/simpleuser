import React ,{ useState,useEffect,useCallback}from "react";

import Card from "../UI/Card";
import classes from './LoadForm.module.css'

const LoadData=()=>{
    const URL="https://apicallsproject-7e177-default-rtdb.firebaseio.com/movies.json";
    const [movies,setMovies]=useState([])
    const [isLoading,setlLoading]=useState(false)
    const [isError,setError]=useState(false);
    const [intervalID,setIntervalId]=useState(null)
    
    
    
    const fetchMovieHandler = useCallback(async function(){
      
        setError(null)
        setlLoading(true)
        try{   
            //const response= await fetch('https://swapi.dev/api/films'); 
            const response=await fetch(URL) 
         
            if(!response.ok){
            throw new Error('Something went wrong. retrying..');
            }
         
    
          const data= await response.json();   
          //code for swapi 
          // const transformdata=data.results.map((moviedata)=>{
          //   return{
          //        id:moviedata.episode_id,
          //        title:moviedata.title
          //         }
          //     })
          //    setMovies(transformdata)
    
          //code for FIREBASE return data
    
           const loadMovies=[];
           for(const key in data){
            loadMovies.push({
              title:data[key].movieName,
              description:data[key].description,
              releaseDate:data[key].releaseDate
            })
           }
        setMovies(loadMovies)
             console.log(loadMovies)
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


return(

<div className={classes.data}>
    <Card  className={classes.data}> 
    <div className={classes.actions}>
    <button onClick={fetchMovieHandler}>fetchMovies</button>
     </div>
    </Card>    
    <Card className={classes.data}>
    
    { !isLoading && movies.length>0 &&
    
       movies.map((data)=>{
      return(<li key={data.id} >
      <div>
      <h3>{data.title}</h3>
        </div>
       <div>
       <h4 >{data.description}</h4>
        </div>
        <div>
        <h4 >{data.releaseDate}</h4>

        </div>
      
         </li>)
})}
{!isLoading && isError&& <p>{isError}</p>}

{isLoading && <p> Loading...</p>}
{!isLoading && movies.length===0 && !isError&&<p> No movies found...</p>}
    </Card>

    </div>
)
}
export default LoadData;