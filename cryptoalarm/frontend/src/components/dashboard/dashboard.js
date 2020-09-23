import React, { Component, Fragment } from 'react';
import Exchange from './exchange.js';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            email: null,
            lastUpdated: null,
        };
    }

    updateDetails = () => {
        if (this.state.username !== this.props.username) {
            this.setState({
                username: this.props.username,
            });
        } else if (this.state.email !== this.props.email) {
            this.setState({
                email: this.props.email,
            });
        }

        if (this.props.isAuth) {
            document.getElementById(
                'welcome'
            ).innerHTML = `welcome back, ${this.state.username}!`;
        }
    };

    lastUpdate = (time) => {
        this.setState({ lastUpdated: time });
    };

    componentDidMount() {
        this.updateDetails();
    }

    componentDidUpdate() {
        this.updateDetails();
    }

    render() {
        const profileDetails = (
            <Fragment>
                <table className='table table-borderless table-responsive'>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{this.state.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
                    </tbody>
                </table>
                <button className='btn btn-info mr-2'>Update</button>
                <button className='btn btn-danger'>Delete</button>
            </Fragment>
        );

        const alerts = (
            <Fragment>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <td>BTC</td>
                            <td>Mark</td>
                            <td>
                                <a href=''>Edit</a>
                            </td>
                            <td>
                                <a href=''>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>
                                <a href=''>Edit</a>
                            </td>
                            <td>
                                <a href=''>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>
                                <a href=''>Edit</a>
                            </td>
                            <td>
                                <a href=''>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>
                                <a href=''>Edit</a>
                            </td>
                            <td>
                                <a href=''>Delete</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>
                                <a href=''>Edit</a>
                            </td>
                            <td>
                                <a href=''>Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        );

        return (
            <Fragment>
                <div className='col-sm-12 wrapper'>
                    <div className='pl-3'>
                        <h1 id='welcome'>{this.state.username}</h1>
                    </div>
                </div>
                <div className='col-sm-8 offset-sm-1 wrapper'>
                    <div className='card exchange mt-5'>
                        <h5 className='card-header'>Daily Overview</h5>
                        <div className='card-body'>
                            <canvas id='chLine' height='100'></canvas>
                            <span id='noData' hidden>
                                No Data Available
                            </span>
                        </div>
                    </div>
                    <div className='card exchange mt-5'>
                        <h5 className='card-header'>
                            Exchange{' '}
                            <span className='text-muted time ml-auto'>
                                Last Updated: {this.state.lastUpdated}
                            </span>
                        </h5>
                        <div className='card-body'>
                            <Exchange lastUpdated={this.lastUpdate} />
                        </div>
                    </div>
                </div>
                <div className='col-sm-4 wrapper'>
                    <div className='card exchange col-sm-9 offset-sm-1 mt-5'>
                        <h5 className='card-header'>Profile Details</h5>
                        <div className='card-body'>
                            {this.props.isAuth ? (
                                profileDetails
                            ) : (
                                <p className='m-3'>
                                    Login to view profile details
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='card exchange col-sm-9 offset-sm-1 mt-5'>
                        <h5 className='card-header'>Alerts</h5>
                        <div className='card-body table-responsive'>
                            {' '}
                            {this.props.isAuth ? (
                                alerts
                            ) : (
                                <p className='m-3'>Login to view alerts</p>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Dashboard;
