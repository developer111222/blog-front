import React, { useEffect, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';  
import { resetPassword, ResetClear } from '../../actions/userAction';  
import { toast } from 'react-toastify';  
import { NavLink, useNavigate, useParams } from 'react-router-dom'; 

const ResetPassword = () => {
    const [password, setPassword] = useState('');  
    const dispatch = useDispatch();  
    const { token } = useParams();  // Destructure token directly
    const navigate = useNavigate(); 
    const { loading, message, resetsuccess, error } = useSelector((state) => state.users);

    const handleSubmit = (e) => {  
        e.preventDefault();  
        dispatch(resetPassword(token, password));  // Use token directly
        setPassword('');
    };  

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(ResetClear());
        }
        if (resetsuccess) {
            toast.success(message);
            navigate('/login');
        }
    }, [error, resetsuccess, dispatch, navigate]);

    return (
        <div className='d-flex justify-content-center flex-column align-items-center' style={{ maxWidth: '400px', margin: 'auto', height: '500px' }}>  
            <div className='d-flex flex-column justify-content-center align-items-center m-10'>  
                <h2 className='fs-2 text-center m-10'>Reset Password</h2>  
                <form className='m-10' onSubmit={handleSubmit}>  
                    <label htmlFor="password" className='fs-5'>Password</label>  
                    <input  
                        type="password"  // Changed to 'password' (lowercase p)
                        className="form-control"  
                        id="floating-input"  
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}  
                        aria-describedby="passwordHelp"  
                        placeholder="Enter Password"  
                        required  
                    />  
                    <button type="submit" className="login-btn" disabled={loading}>  
                        {loading ? 'Loading...' : 'Reset Password'}  
                    </button>  
                </form>  
                <NavLink className='fs-5 text-decoration-none my-10' to="/login">Already have an account?</NavLink>
            </div>  
        </div>  
    );
}

export default ResetPassword;
