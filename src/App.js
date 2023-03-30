
import './App.css';
import React,{useState} from 'react';


function App() {
const [movies,setMovies]=useState([])
const [isLoading,setlLoading]=useState(false)
const [isError,setError]=useState(false);
async function fetchMovieHandler(){
  setError(null)
  setlLoading(true)
  try{
           const response=await fetch('https://swapi.dev/api/film');
               if(!response.ok){
                     throw new Error('Something went wrong...');
                  }
             const data=await response.json();
  
 
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

        }
        setlLoading(false)

      }

 return(
  <div>
    <section style={{justifyContent:"center",marginLeft:"50%"}}>
      <button style={{backgroundColor:"orange"}} onClick={fetchMovieHandler}>fetchMovies</button>
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
