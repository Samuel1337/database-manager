import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = (id) => {
    if (id === 'home') document.scrollIntoView(0,0);
    if (id) document.getElementById(id).scrollIntoView();
    setClick(false);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <ul>
      <li className='nav-item'>
        <NavLink className='nav-links' exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
      <li className='nav-item'>
        <Link className='nav-links' href="home" onClick={() => closeMobileMenu("about")}>
          ABOUT
        </Link>
      </li>
      <li className='nav-item'>
        <Link
        
          className='nav-links'
          onClick={() => closeMobileMenu("novel")}
        >
          NOVEL
        </Link>
      </li>
      <li className='nav-item'>
        <Link
        
          className='nav-links'
          onClick={() => closeMobileMenu("musical")}
        >
          MUSICAL
        </Link>
      </li>
      <li className='nav-item'>
        <Link
        
          className='nav-links'
          onClick={() => closeMobileMenu("VR")}
        >
          VR EXPERIENCE
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;