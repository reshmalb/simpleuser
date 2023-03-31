
import './App.css';
import React,{useCallback, useEffect, useState} from 'react';


function App() {

  const URL="https://apicallsproject-7e177-default-rtdb.firebaseio.com/movies.json";
const [movies,setMovies]=useState([])
const [isLoading,setlLoading]=useState(false)
const [isError,setError]=useState(false);
const [intervalID,setIntervalId]=useState(null)


const [movieName,setMovieName]=useState("");
const [description,setDescription]=useState("");
const [releaseDate,setReleaseDate]=useState(" ")

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

// const onCancelFetchingHandler =()=>{
//   // clearInterval(intervalID);
//   // setIntervalId("canceled")  
//   // setError("Cancelled Fetching")
// }
const namehandler=(e)=>{
    setMovieName(e.target.value)
}
const descHandler=(e)=>{
  setDescription(e.target.value)
}
const dateHandler=(e)=>{
  setReleaseDate(e.target.value)
}
const submithandler=(e)=>{
  e.preventDefault();
  const movie={
    movieName:movieName,
    description:description,
    releaseDate:releaseDate
  }
  addMovieHandler(movie)


  setDescription('');
  setMovieName('');
  setReleaseDate('')

}
async function addMovieHandler(movie){
   const response=await   fetch(URL,{
    method:'POST',
    body:JSON.stringify(movie),
    headers:{
      'Content-Type':'application/json'
    }
   })
   const data=await response.json();
}



     //const retryForm=
 return(
<div>
    <div>
      <form style={{display:"flex-column"}} onSubmit={submithandler}>
        <label  htmlFor='title'>title</label>
        <input type="text" id="title"
         onChange={namehandler}
         value={movieName}></input>
        <label  htmlFor='desc'>Text</label>
        <input type="text" id="desc" 
        onChange={descHandler}
        value={description}></input>
        <label  htmlFor='date'>ReleaseDate:</label>
        <input type="text" id="date" 
        onChange={dateHandler}
        value={releaseDate}></input>
        <button type="submit">ADD MOVIES</button>



      </form>
    </div>

     <section style={{justifyContent:"center",marginLeft:"50%"}}>
      <button style={{backgroundColor:"orange"}} onClick={fetchMovieHandler}>fetchMovies</button>
     {/* {isError && <button onClick={onCancelFetchingHandler}>Cancel fetching</button>} */}
    </section>
    <main>
    <section style={{marginLeft:"30%", marginRight:"30%",  marginTop:"3rem"}}>
      <div style={{backgroundColor:"white"}}>
    <u  style={{backgroundColor:"white"}}> Movies data </u>


         { !isLoading && movies.length>0 &&
         
         movies.map((data)=>{
        return(<li key={data.id} style={{backgroundColor:"white"}}>
          <span  style={{backgroundColor:"white"}}>{data.title}</span>
           <span style={{backgroundColor:"white"}}>{data.description}</span>
           <span style={{backgroundColor:"white"}}>{data.releaseDate}</span>

            </li>)
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
