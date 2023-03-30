import React,{useState} from "react";
import './UserList.css'


const UserList=(props)=>{

    console.log(props.name)
    console.log(props.age);
    return(

             <div className="div-userdata">
             {props.name}({props.age})years
             </div>
      
    )
    
}
export default UserList;