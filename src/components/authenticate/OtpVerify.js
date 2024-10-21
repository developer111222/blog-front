import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  
import { otpverify, resendOtp, ResetClear } from '../../actions/userAction'; 
import { toast } from 'react-toastify'; 
import Spinner from '../../utils/Spinner';

const OtpVerify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isverify, resendotpsuccess, message } = useSelector(state => state.users);  
    const [otp, setOtp] = useState('');  
    const [isResending, setIsResending] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);

    const location = useLocation();
    const email = location.state?.email;

    const handleVerify = async (e) => {  
        e.preventDefault();  
        setLocalLoading(true);
        dispatch(otpverify(email, otp));  
    };  

    const resendOtpHandler = () => {
        setIsResending(true);
        setLocalLoading(true);
        dispatch(resendOtp(email));
    }

    useEffect(() => {  
        if (error) {  
            toast.error(error);  
            setLocalLoading(false);
            dispatch(ResetClear());  
        }  
        if (isverify) {  
            toast.success(message);  
            setLocalLoading(false);
            navigate('/user-dashboard');
            dispatch(ResetClear());
        }  
        if (resendotpsuccess) {
            toast.success(message);
            setLocalLoading(false);
            setIsResending(false);
        }
    }, [dispatch, error, isverify, message, resendotpsuccess, navigate]);  

    return (
        <div className='d-flex justify-content-center flex-column align-items-center' style={{ maxWidth: '400px', margin: 'auto', height: '500px' }}>  
            <div className='d-flex flex-column justify-content-center align-items-center m-10'>  
                <h2 className='fs-2 text-center m-10'>Otp Verify</h2>  
                <form className='m-10' onSubmit={handleVerify}>  
                    <label htmlFor="otp" className='fs-5'>OTP</label>  
                    <input  
                        type='text'  
                        className='form-control p-3'  
                        value={otp}  
                        onChange={(e) => setOtp(e.target.value)}  
                        id='floating-input'  
                        placeholder="Enter OTP"  
                        required  
                    />  
                    <button type="submit" className="login-new" disabled={loading || loading}>  
                    {localLoading ? <Spinner/> : 'verify '} 
                    </button>  
                </form>  
                <p className='fs-5 text-decoration-none my-10' style={{color:"blue",cursor:"pointer"}} onClick={resendOtpHandler} disabled={isResending}> 
                    {isResending ? 'Resending...' : 'Resend OTP'}
                </p>
                {error && <div className="text-danger">{error}</div>}
            </div>  
        </div>  
    );
}

export default OtpVerify;
