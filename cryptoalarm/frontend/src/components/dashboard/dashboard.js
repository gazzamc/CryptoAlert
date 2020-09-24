import React, { Component, Fragment } from 'react';
import Exchange from './exchange/exchange';
import Profile from './profile/profile';
import Alerts from './alerts/alerts';
import Overview from './overview/overview';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {};
    }

    updateDetails = () => {
        if (this.props.isAuth) {
            document.getElementById(
                'welcome'
            ).innerHTML = `welcome back, ${this.props.username}!`;
        }
    };

    componentDidMount() {
        this.updateDetails();
    }

    componentDidUpdate() {
        this.updateDetails();
    }

    render() {
        return (
            <Fragment>
                <div className='col-sm-12 wrapper'>
                    <div className='pl-3'>
                        <h1 id='welcome'>{this.props.isAuth}</h1>
                    </div>
                </div>
                <div className='col-sm-8 offset-sm-1 wrapper'>
                    <Overview isAuth={this.props.isAuth} />
                    <Exchange />
                </div>
                <div className='col-sm-4 wrapper'>
                    <Profile
                        username={this.props.username}
                        isAuth={this.props.isAuth}
                        email={this.props.email}
                        updateAuth={this.props.updateAuth}
                    />
                    <Alerts isAuth={this.props.isAuth} />
                </div>
            </Fragment>
        );
    }
}

export default Dashboard;
