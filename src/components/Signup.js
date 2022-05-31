import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link ,useNavigate} from 'react-router-dom';


export default function Signup() {
    const emailRef=useRef();
    const passRef=useRef();
    const passConfirmRef=useRef();
    const {signup} = useAuth()
    const history=useNavigate();

    const [error,setError]=useState();
    const [loading,setLoading]=useState();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(passConfirmRef.current.value!==passRef.current.value){
          return setError("Passwords Do Not Match");
        }
        if(passRef.current.value.length<6){
          return setError("Password sould be atleast 6 characters long");
        }
        try{
          setLoading(true);
          setError('');
           await signup(emailRef.current.value,passRef.current.value);
           setLoading(false);
           history("/dashboard");
        }
        catch(err){
          setLoading(false);
          setError("Failed to Create a new account");
        }
    }
    const printError=<div className="error-box">{error} </div>
  return (
    <div className="box">
        <div className='heading'>Sign Up</div>
        {error && printError}
        <form onSubmit={handleSubmit}>
        <label >Email address</label> <br/>
        <input ref={emailRef} type="email"/> <br/>
        <label >Password</label> <br/>
        <input type="password" ref={passRef} /> <br/>
        <label >Renter Password</label> <br/>
        <input type="password" ref={passConfirmRef}/> <br/>
        <button disabled={loading }>Submit</button>
        </form>
        <div className='bottom-text'>
        Already Have an account? <br/>
        <Link to="/login">Sign In</Link>
        </div>
    </div>
  )
}
