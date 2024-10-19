import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AirplayIcon from '@mui/icons-material/Airplay';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const MobileHeader = () => {
  return (
<header class="mobile-header">
        <nav class="nav">
            <a href="#home" class="nav-item active">
                <span class="material-icons"><HomeIcon/></span>
            
            </a>
            <a href="#about" class="nav-item">
                <span class="material-icons"><AirplayIcon/></span>
                About
            </a>
            <a href="#services" class="nav-item">
                <span class="material-icons"><LoginIcon/></span>
              
            </a>
            <a href="#contact" class="nav-item">
                <span class="material-icons"><ExitToAppIcon/></span>
               
            </a>
        </nav>
    </header>
  )
}

export default MobileHeader
