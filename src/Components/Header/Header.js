import React, { useContext, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import ArrowDown from '../../assets/ArrowDown';
import { getAuth,signOut } from 'firebase/auth';
function Header() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const togglePopover = (e) => {
    setPopoverVisible(!isPopoverVisible);
    if (e.target) {
      const rect = e.target.getBoundingClientRect();
      setPopoverPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };
  const handleSignout = () => {
      const auth = getAuth();
      signOut(auth).then(() => {
        alert('THANKS FOR USING OLX');
        navigate('/login');
      }).catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <a href='/'><OlxLogo></OlxLogo></a>       
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='India'/>
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user !== null? user.displayName+' ' :  <a href="/login" style={{color:'black'}}>login</a>}</span>
          <hr/>
        </div>
        {user && (
          <span>
            <a
                style={{ color: 'black', cursor: 'pointer' }}
                onClick={(e) => togglePopover(e)}
            >
              <ArrowDown />
            </a>
            {isPopoverVisible && (
              <div className="signOut popover"
              style={{
                position: 'absolute',
                top: popoverPosition.top + 'px',
                left: popoverPosition.left + 'px',
              }}>
                <button className="btn btn-secondary" onClick={handleSignout}>
                  logout
                </button>
              </div>
            )}
          </span>
        )}

        <div className="sellMenu" onClick={()=>{navigate('/sell')}}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
