import React,{useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const emailRef=useRef();
    const passRef=useRef();
    const {login} = useAuth()
    const history=useNavigate();
    const [error,setError]=useState();
    const [loading,setLoading]=useState(false);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
          setLoading(true);
           await login(emailRef.current.value,passRef.current.value);
           history("/dashboard");
        }
        catch(err){
          setLoading(false);
            setError("Failed to Login !");
        }
    }

    const printError=<div className="error-box">{error} </div>
  return (
    <div className="box">
      <div className='heading'>Log In</div>
        {error && printError}
        <form onSubmit={handleSubmit}>
        <label >Email address</label> <br/>
        <input ref={emailRef} type="email"/> <br/>
        <label >Password</label> <br/>
        <input type="password" ref={passRef} /> <br/>
        <button disabled={loading}>Submit</button>
        </form>
        <div className='bottom-text'>
        Don't Have an account? <br/>
        <Link to="/signup">Sign Up</Link>
        </div>
        
    </div>
  )
}
