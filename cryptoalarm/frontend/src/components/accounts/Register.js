import { object } from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../api/auth';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            errorMsg: '',
            result: {},
            status: null,
            redirect: null,
        };
    }

    redirectToHome = () => {
        this.setState({ redirect: '/' });
    };

    redirectToLogin = (e) => {
        e.preventDefault();
        this.setState({ redirect: '/login' });
    };

    handleUsername = (e) => {
        this.setState({ username: e.target.value });
    };

    handlePassword = (e) => {
        let pass = document.getElementById('Password').value;
        let msg = document.getElementById('error');

        if (e.target.value !== pass) {
            msg.classList.replace('text-success', 'text-danger');

            this.setState({
                errorMsg: 'passwords do not match',
            });
        } else {
            msg.classList.replace('text-danger', 'text-success');

            this.setState({
                errorMsg: 'passwords match!',
            });

            this.setState({ password: e.target.value });
        }
    };

    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    handleRegistration = async (e) => {
        e.preventDefault();
        let msg = document.getElementById('error');

        if (this.state.msg !== '') {
            this.setState({ errorMsg: '' });
        }

        if (msg.classList.contains('text-success')) {
            msg.classList.replace('text-success', 'text-danger');
        }

        await registerUser(
            (res) =>
                this.setState({
                    result: res.data,
                    status: res.status,
                }),
            this.state.username,
            this.state.password,
            this.state.email
        );

        if (this.state.status === 200) {
            // Store user details in local storage
            localStorage.setItem('token', this.state.result.token);
            localStorage.setItem('isAuth', true);
            localStorage.setItem('email', this.state.result.user.email);
            localStorage.setItem('username', this.state.result.user.username);

            this.props.updateAuth(
                true,
                this.state.result.user.username,
                this.state.result.user.email
            );
            this.redirectToHome();
        } else {
            for (const key in this.state.result.data) {
                this.setState({ errorMsg: this.state.result.data[key][0] });
            }

            if (this.state.errorMsg === 'This field may not be blank.') {
                this.setState({ errorMsg: 'Please fill in all fields' });
            }
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <div className='col-sm-4 wrapper'>
                <div className='card exchange col-sm-12 mt-5 p-0'>
                    <h5 className='card-header'>Register</h5>
                    <div className='card-body'>
                        <form className='mb-4'>
                            <div className='form-group'>
                                <label htmlFor='username'>Username</label>
                                <input
                                    onChange={this.handleUsername}
                                    className='form-control'
                                    id='username'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    onChange={this.handleEmail}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Password'>Password</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='Password'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Password2'>
                                    Confirm Password
                                </label>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='Password2'
                                    onChange={this.handlePassword}
                                />
                            </div>
                            <small id='error' className='form-text text-danger'>
                                {this.state.errorMsg}
                            </small>
                            <div className='col-sm-12 mt-5 mb-5'></div>
                            <button
                                onClick={this.handleRegistration}
                                className='btn btn-primary'>
                                Register
                            </button>
                        </form>
                        <p to='/login'>
                            {' '}
                            Have an account? login
                            <a
                                href=''
                                className='text-primary'
                                onClick={this.redirectToLogin}>
                                {' '}
                                here.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
