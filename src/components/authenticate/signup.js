import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { NavLink, useNavigate } from 'react-router-dom';  
import { toast } from 'react-toastify';  
import { usersignup, ResetClear, otpverify } from '../../actions/userAction';  


const Signup = () => {  
    const dispatch = useDispatch();  
    const navigate = useNavigate();  

    const { loading, error,issuccess, success, message } = useSelector(state => state.users);  

    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const [otp, setOtp] = useState('');  
    const [step, setStep] = useState(1);  

    const handleSignup = async (e) => {  
        e.preventDefault();  
        // Update the state immediately to show the OTP verification form  
        setStep(2);  
        dispatch(usersignup(email,password));  
    };  

    const handleVerify = async (e) => {  
        e.preventDefault();  
        dispatch(otpverify(email, otp));  
    };  

    useEffect(() => {  
        if (error) {  
            toast.error(error);  
            dispatch(ResetClear());  
        }  
        if (success) {  
            if (step === 2) {  
                toast.success(message);   
                // Redirect to the profile page upon successful OTP verification  
            }  
        }  
        if(issuccess){
            toast.success(message)
            navigate('/profile');   
            
        }

    }, [dispatch, navigate, error,issuccess, success, message, step]);  

    return (  
        <div className=' d-flex justify-content-between align-iten-center p-6'>  
        <div className='col-6 '> {/* Adjusted for centering */}
            <img src='https://app.crowdgen.com/static/media/signin_pexels_image.731039b424562248a45e.jpg' alt='image' style={{width:"100%"}} />
        </div>
        <div className='col-6 '>
            {step === 1 ? (  
                <form onSubmit={handleSignup} className='p-5' >  
                <h1 className='text-center'>Sign in</h1>
                    <div className='my-4 my-10' >  
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
                    <div className='my-4 my-10'>  
                        <label className='fs-5' htmlFor='floating-input-password'>Password</label>  <br/>
                        <input  
                            type="password"  
                            className='form-control p-3'  
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)}  
                            id='floating-input'  // Changed ID for uniqueness
                            placeholder="password"  
                            required  
                        />  
                    </div>
                    <button type='submit' className='login-btn my-10' disabled={loading}>  
                        {loading ? 'Signing Up...' : 'Sign Up'}  
                    </button>  
                    <div className='text-center my-4'>
                    <NavLink className='fs-5 text-decoration-none my-10' to="/login">Already have account</NavLink>
                    </div>
                </form>  
            ) : (  
                <form className='col-md-12' onSubmit={handleVerify}> 
                 <h1 className='text-center'>Otp verify</h1> 
                    <div className='my-10'>  
                        <label className='fs-5' htmlFor='floating-input-otp'>OTP</label>  
                        <input  
                            type='text'  
                            className='form-control p-3'  
                            value={otp}  
                            onChange={(e) => setOtp(e.target.value)}  
                            id='floating-input-otp'  
                            placeholder="Enter OTP"  
                            required  
                        />  
                    </div>  
                    <button type="submit" className='login-btn my-10' disabled={loading}>  
                        Verify OTP  
                    </button>  
                    
                </form>  
            )}  
        </div>
    </div>
    
    );  
};  

export default Signup;