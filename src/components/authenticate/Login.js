import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userlogin, ResetClear } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';  
import Spinner from '../../utils/Spinner';

const Login = () => {
  const dispatch = useDispatch();
const navigate=useNavigate();
  const { loading, error, success, message,isAuthenticated } = useSelector((state) => state.users);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setLocalLoading(true);
    dispatch(userlogin(email,password));
  };

  useEffect(() => {

      if (error) {
        toast.error(error); // Display error toast
        setLocalLoading(false);
        dispatch(ResetClear());
      }
   

    if (success) {
      // Move to the next step if signup is successful
      toast.success(message); // Display success toast for signup
      navigate('/user-dashboard')
      dispatch(ResetClear());
      setLocalLoading(false);
    }
  }, [dispatch,error, success]);


  

  return (
    
    <div className='d-flex justify-content-between  align-item-center' >  
        <div className='col-6' style={{width:'50%'}}> {/* Adjusted for centering */}
            <img src='https://app.crowdgen.com/static/media/signin_pexels_image.731039b424562248a45e.jpg' style={{width:"100%"}} alt='image' className='img-fluid' />
        </div>

        <div className='col-6 '>
           <form onSubmit={handleVerify} className='p-5' >
            <h1 className='text-center'> Login</h1>
                    <div className='my-10' >  
                    <label className='fs-5' htmlFor='floating-input'>Email</label> <br></br>
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
                        <label className='fs-5' htmlFor='floating-input-password'>Password</label>  <br></br>
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
                    <div className=''>
                    <NavLink className='fs-5 text-decoration-none' style={{float:'right'}} to="/forget-password">forget password</NavLink>
                    </div><br></br>
                    <button type='submit' className='login-new' disabled={loading || localLoading}>  
                    {localLoading ? <Spinner/> : 'login '} 
                    </button>  
                    <div className='text-center my-4'>
                    <NavLink className='fs-5 text-decoration-none my-10' to="/signup">sign up now</NavLink>
                    </div>
           </form>
      </div>
    </div>
  
  );
};

export default Login;
