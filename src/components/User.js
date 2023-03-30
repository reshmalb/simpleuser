import React from "react";
import UserList from "./UserList";
import'./User.css'
const User=(props)=>{

    console.log(props.items)

   
    return(
        <div className="div-userdata">
      { props.items.map((val)=>

   <UserList key={val.id} 
   name={val.name}  
   age={val.age}></UserList>)}
   </div>
  
    )
}
export default User;