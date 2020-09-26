import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './header/header';
import Login from './accounts/Login';
import Register from './accounts/Register';
import CreatAlert from './alert/createAlert';
import EditAlert from './alert/editAlert';
import Dashboard from './dashboard/dashboard';
import { getUser } from '../api/auth';
import './App.css';

class App extends Component {
    state = {
        username: null,
        user_id: null,
        email: null,
        isAuth: false,
        result: {},
        status: null,
    };

    async checkLoginStatus() {
        let token = localStorage.getItem('token');
        if (token !== null) {
            // Check if users token is valid
            await getUser(
                (res) =>
                    this.setState({
                        result: res.data,
                        status: res.status,
                    }),
                token
            );

            if (this.state.status === 200) {
                this.setState({
                    username: this.state.result.username,
                    user_id: this.state.result.pk,
                    email: this.state.result.email,
                    isAuth: true,
                });
            } else {
                this.resetAuthState();
            }
        }
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    resetAuthState = () => {
        this.setState({
            isAuth: false,
            username: null,
            email: null,
            user_id: null,
        });

        localStorage.setItem('token', null);
        localStorage.setItem('isAuth', false);
        localStorage.setItem('email', null);
        localStorage.setItem('user_id', null);
    };

    updateAuth = (bool, user, email, pk) => {
        this.setState({
            isAuth: bool,
            username: user,
            email: email,
            user_id: pk,
        });
    };

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Header
                        resetAuth={this.resetAuthState}
                        isAuth={this.state.isAuth}
                    />
                    <div className='container'>
                        <div className='row'>
                            <Switch>
                                <Route
                                    exact
                                    path='/'
                                    render={(props) => (
                                        <Dashboard
                                            username={this.state.username}
                                            email={this.state.email}
                                            isAuth={this.state.isAuth}
                                            updateAuth={this.updateAuth}
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path='/login'
                                    render={(props) => (
                                        <Login
                                            updateAuth={this.updateAuth}
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path='/register'
                                    render={(props) => (
                                        <Register
                                            updateAuth={this.updateAuth}
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path='/alert'
                                    component={CreatAlert}
                                />
                                <Route
                                    exact
                                    path='/alert/edit/:userId'
                                    component={EditAlert}
                                />
                            </Switch>
                        </div>
                    </div>
                </Fragment>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
