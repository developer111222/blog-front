import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
 import {forgetpassword,ResetClear} from '../../actions/userAction';
 import {toast} from 'react-toastify';
 import { NavLink, useNavigate } from 'react-router-dom'; 
 import Spinner from '../../utils/Spinner'

const ForgetPassword = () => {  
    const [email, setEmail] = useState('');  
    const dispatch = useDispatch();  
const navigate=useNavigate(); 
    const {loading,message,forgetsuccess,error}=useSelector((state)=>state.users)

    const handleSubmit = (e) => {  
        e.preventDefault();  
      dispatch(forgetpassword(email))
      setEmail('')
    };  
useEffect(()=>{
if(error){
    toast.error(error)
    dispatch(ResetClear())
}
if(forgetsuccess){
    toast.success(message)
    navigate('/login')
}
},[error,forgetsuccess,dispatch,navigate])

    return (  
        <div className='d-flex justify-content-center flex-column align-items-center' style={{ maxWidth: '400px', margin: 'auto', height: '500px' }}>  
            <div className='d-flex flex-column justify-content-center align-items-center m-10'>  
                <h2 className='fs-2 text-center m-10'>Forget Password</h2>  
                <form className='m-10' onSubmit={handleSubmit}>  
                    <label htmlFor="email" className='fs-5'>Email address</label>  
                    <input  
                        type="email"  
                        className="form-control"  
                        id="floating-input"  
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)} // Corrected the onChange here  
                        aria-describedby="emailHelp"  
                        placeholder="Enter email"  
                        required // Optionally, make this field required  
                    />  
                                      <button type="submit" className="login-btn" disabled={loading}>  
                        {loading ? 'loading...' : 'Forget Password'}  
                    </button>  

                </form>  
                <NavLink className='fs-5 text-decoration-none my-10' to="/login">alreday have account</NavLink>
            </div>  
        </div>  
    );  
};  

export default ForgetPassword;