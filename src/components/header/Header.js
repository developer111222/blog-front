import React, { useEffect } from 'react';
import './header.css';
import { NavLink } from 'react-router-dom'; // Corrected import
import ResponsiveAppBar from '../authenticate/avtar'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../utils/Spinner';
import { Userprofile } from '../../actions/userAction';
import { toast } from 'react-toastify';

const Header = () => {
    const dispatch = useDispatch();
    const { loading, error, user,isAuthenticated,success } = useSelector(state => state.users);
   
  console.log(user,"Loading")
    useEffect(() => {
  if(success){
  
    dispatch(Userprofile());
  }
    }, [dispatch,isAuthenticated]);
  
    // useEffect(() => {
    //   if (error) {
    //     toast.error(error);
    //   }
    // }, [error]);

    return (
        <header className="header">
            <div className="logo">Your Logo</div>
            <nav className="nav">
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink></li>
                    <li><NavLink to="/">Home</NavLink></li>
                   
                </ul>
                
            </nav>
            {
                    !isAuthenticated?
                    <div className='auth'>
             
                    <NavLink to="/signup"><button>Signup</button></NavLink>
                    <NavLink to="/login"><button>login</button></NavLink>
                    </div>
                 :
                    <ResponsiveAppBar user={user}/>
                }
         
        </header>
    );
}

export default Header;
