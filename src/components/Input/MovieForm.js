     import React,{useState} from "react"
     import classes from './MovieForm.module.css'
     import Card from "../UI/Card";


     const MovieForm=()=>{

      const URL="https://apicallsproject-7e177-default-rtdb.firebaseio.com/movies.json";


      const [movieName,setMovieName]=useState("");
      const [description,setDescription]=useState("");
      const [releaseDate,setReleaseDate]=useState(" ");
     const [isLoading,setlLoading]=useState(false)

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
  


      return(
        <Card className={classes.form}>   
   
        <form  onSubmit={submithandler}>
        <div className={classes.control}>
           
           <label  htmlFor='name'>Movie Name:</label>
            <input type="text" id="descname" 
            onChange={namehandler}
              value={movieName}></input>
            </div>
   
           <div className={classes.control}>
           
               <label  htmlFor='desc'>Text</label>
                <input type="text" id="desc" 
                onChange={descHandler}
                  value={description}></input>
                </div>
           <div className={classes.control}>
             
           <label  htmlFor='date'>ReleaseDate:</label>
           <input type="text" id="date" 
           onChange={dateHandler}
           value={releaseDate}></input>
           </div>
           <div className={classes.actions}>
         <button type="submit">ADD MOVIES</button>
   
           </div>
         </form>
       </Card>
      )

     }
     export default MovieForm;
     
     
   