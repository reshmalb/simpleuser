import React,{userState, useState} from 'react'
import './UserForm.css'

const UserForm=props=>{
  
    const [enteredName,SetEnteredName]=useState('');
    const [enteredAge,setEnteredAge]=useState('');

    const inputNameHandler=(event)=>{
        if(event.target.value===''){
            window.alert("Enter a valid name")
            return;
        }
        else{
            SetEnteredName(event.target.value)
        }

    }
    const inputAgeHandler=(event)=>{
        if(event.target.value<=0 || event.target.value>100)  {
            window.alert("Enter a valid age")
            return;
        }
        else{
            setEnteredAge(event.target.value)
        }
    }
  const submitHandler=(event)=>{
    event.preventDefault();
    const userData=[
        {
            id:Math.random().toString(),
            name:enteredName,
            age:enteredAge
        }
    ]
    props.onSaveUserdata(userData);

  }
   

    return(
        <form className='user-form-control' onSubmit={submitHandler}>
            <div className='form-control-items'>           
           <label >Username:</label>
            <input type="text" className="input-group1" onChange={inputNameHandler}></input>         
             </div>
             <div className='form-control-items'>
            <label>Age(years):</label>
            <input type="number"  min="1"  className="input-group1" onChange={inputAgeHandler}></input>       
            </div>
          <button id="btn-sbt" type="submit" > Add User</button>
    
           
        </form>
        
    )

}
export default UserForm;