import React, { Component } from 'react';
import { login } from '../../api/auth';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 'test',
            username: '',
            password: '',
            errorMsg: '',
            result: {},
            status: null,
            redirect: null,
        };
    }

    componentDidMount() {
        this.props.updateAuth();
    }

    redirectToHome = () => {
        this.setState({ redirect: '/' });
    };

    redirectToReg = (e) => {
        e.preventDefault();
        this.setState({ redirect: '/register' });
    };

    handleUsername = (e) => {
        this.setState({ username: e.target.value });
    };

    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    handleLogin = async (e) => {
        e.preventDefault();
        if (this.state.username == '' || this.state.password == '') {
            this.setState({ errorMsg: 'Please fill out both fields.' });
            return;
        }

        await login(
            (res) =>
                this.setState({
                    result: res.data,
                    status: res.status,
                }),
            this.state.username,
            this.state.password
        );

        if (this.state.status === 200) {
            // Store user details in local storage
            localStorage.setItem('user_id', this.state.result.user.pk);
            localStorage.setItem('token', this.state.result.token);
            localStorage.setItem('isAuth', true);
            localStorage.setItem('email', this.state.result.user.email);

            this.props.updateAuth(
                true,
                this.state.result.user.username,
                this.state.result.user.email,
                this.state.result.user.pk
            );
            this.redirectToHome();
        } else {
            this.setState({
                errorMsg: 'Incorrect login details or user does not exist',
            });
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <div className='col-sm-4 wrapper'>
                <div className='card exchange col-sm-12 mt-5 p-0'>
                    <h5 className='card-header'>Login</h5>
                    <div className='card-body'>
                        <form className='mb-3'>
                            <div className='form-group'>
                                <label htmlFor='username'>Username</label>
                                <input
                                    className='form-control'
                                    onChange={this.handleUsername}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='Password'>Password</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    onChange={this.handlePassword}
                                />
                            </div>
                            <small id='error' className='form-text text-danger'>
                                {this.state.errorMsg}
                            </small>
                            <div className='col-sm-12 mt-5 mb-5'></div>
                            <a
                                onClick={this.handleLogin}
                                className='btn btn-primary'>
                                Login
                            </a>
                        </form>
                        <p to='/login'>
                            {' '}
                            Dont have an account? register
                            <a
                                href=''
                                className='text-primary'
                                onClick={this.redirectToReg}>
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

export default Login;
