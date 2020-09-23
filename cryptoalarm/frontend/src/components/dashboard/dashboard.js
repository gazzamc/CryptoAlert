import React, { Component, Fragment } from 'react';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            email: null,
        };
    }

    updateDetails() {
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
    }

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
                            Exchanges
                            <span className='float-sm-right text-muted refresh-date'>
                                Updated: 0 mins ago
                            </span>
                        </h5>
                        <div className='card-body table-responsive'>
                            <table className='table table-striped'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th scope='col'></th>
                                        <th scope='col'>USD</th>
                                        <th scope='col'>EUR</th>
                                        <th scope='col'>GBP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>BTC</td>
                                        <td>211</td>
                                        <td>543</td>
                                        <td>645</td>
                                    </tr>
                                    <tr>
                                        <td>LTC</td>
                                        <td>211</td>
                                        <td>543</td>
                                        <td>645</td>
                                    </tr>
                                    <tr>
                                        <td>BLK</td>
                                        <td>211</td>
                                        <td>543</td>
                                        <td>645</td>
                                    </tr>
                                </tbody>
                            </table>
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
