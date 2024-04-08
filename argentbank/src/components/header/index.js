import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.css'
import logo from './img/argentBankLogo.webp'
import '@fortawesome/fontawesome-free/css/all.css';
import { logout } from '../../feature/userSlice';

const Header = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className='header_content'>
            <div className='logo_content'>
                <Link to="/">
                    <img className='logo' src={logo} alt='Logo Argent Bank' />
                </Link>
            </div>
            <nav className='nav_link'>
                {!user.firstname && <>
                    <Link className='link_loggin' to="/Login" >
                        <i className="fa fa-user-circle"></i>Sign in
                    </Link>
                </>}

                {user.firstname && <>
                    <Link className='link_loggin' to="/profile">{user.username}
                    </Link>
                    <Link className='link_loggin' to="/" onClick={handleLogout}>
                        <i className="fa fa-user-circle"></i>Logout
                    </Link>
                </>}

            </nav>
        </header>
    );
};

export default Header;