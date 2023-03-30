
import './App.css';
import React,{useState} from 'react';


function App() {
const [movies,setMovies]=useState([])
const [isLoading,setlLoading]=useState(false)

async function fetchMovieHandler(){
  setlLoading(true)
  const response=await fetch('https://swapi.dev/api/films');
  const data=await response.json();
  const transformdata=data.results.map((moviedata)=>{
    return{
      id:moviedata.episode_id,
      title:moviedata.title

    }
  })
  setMovies(transformdata)
  setlLoading(false)
  console.group(transformdata)
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
      {isLoading && <p> Loading...</p>}
      {isLoading && movies.length===0 && <p> No movies found...</p>}

      </div>
    </section>
    </main>
    
  </div>
 ) 

}

export default App;
