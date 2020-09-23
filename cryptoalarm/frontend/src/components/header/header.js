import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../api/auth';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            status: null,
        };
    }

    logout = async () => {
        let token = localStorage.getItem('token');
        await logoutUser(
            (res) =>
                this.setState({
                    status: res.status,
                }),
            token
        );
        this.props.resetAuth();
    };

    render() {
        const loggedLinks = (
            <li className='nav-item'>
                <Link className='nav-link' to='/' onClick={this.logout}>
                    Logout
                </Link>
            </li>
        );
        const guestLinks = (
            <Fragment>
                <li className='nav-item'>
                    <Link className='nav-link' to='/register'>
                        Register
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                        Login
                    </Link>
                </li>
            </Fragment>
        );

        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link className='navbar-brand' to='/'>
                    CryptoAlarm
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'>
                    <ul className='navbar-nav ml-auto'>
                        {this.props.isAuth ? loggedLinks : guestLinks}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
