import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { NavLink, useNavigate } from 'react-router-dom';  
import { toast } from 'react-toastify';  

import { usersignup, ResetClear } from '../../actions/userAction';  

const Signup = () => {  
    const dispatch = useDispatch();  
    const navigate = useNavigate();  

    const { loading, error, issuccess, message } = useSelector(state => state.users);  

    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  

    const handleSignup = async (e) => {  
        e.preventDefault();  
        dispatch(usersignup(email, password));  
    };  

    useEffect(() => {  
        if (error) {  
            toast.error(error);  
            dispatch(ResetClear());  
        }  
        if (issuccess) {  
            toast.success(message);  
            // Redirect to verification page and pass email as state
            navigate('/otp-verify', { state: { email } });  
        }  
    }, [dispatch, error, issuccess, message, navigate, email]);  

    return (  
        <div className='d-flex justify-content-between align-items-center p-6'>  
            <div className='col-6'> 
                <img src='https://app.crowdgen.com/static/media/signin_pexels_image.731039b424562248a45e.jpg' alt='image' style={{ width: "100%" }} />
            </div>
            <div className='col-6'>
                <form onSubmit={handleSignup} className='p-5'>  
                    <h1 className='text-center'>Sign Up</h1>
                    <div className='my-4'>  
                        <label className='fs-5' htmlFor='floating-input'>Email</label> <br />
                        <input  
                            type="email"  
                            className='form-control p-3'  
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)}  
                            id='floating-input'  
                            placeholder="name@example.com"  
                            required  
                        />  
                    </div>  
                    <div className='my-4'>  
                        <label className='fs-5' htmlFor='floating-input-password'>Password</label> <br />
                        <input  
                            type="password"  
                            className='form-control p-3'  
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)}  
                            id='floating-input'  
                            placeholder="password"  
                            required  
                        />  
                    </div>
                    <button type='submit' className='login-btn my-10' disabled={loading}>  
                        {loading ? 'Signing Up...' : 'Sign Up'}  
                    </button>  
                </form>
                <div className='text-center my-4'>
                    <NavLink className='fs-5 text-decoration-none my-10' to="/login">Already have an account?</NavLink>
                </div>
            </div>
        </div>
    );  
};  

export default Signup;
