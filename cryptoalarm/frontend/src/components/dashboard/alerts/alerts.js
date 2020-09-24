import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Alerts extends Component {
    constructor() {
        super();
        this.state = {
            redirect: null,
        };
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        const alerts = (
            <Fragment>
                <Link to='/alert' isAuth={this.props.isAuth}>
                    <button
                        type='button'
                        onClick={this.addAlert}
                        className='btn btn-success ml-1 mt-2 mb-2'
                        data-dismiss='modal'>
                        Add
                    </button>
                </Link>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <td>BTC</td>
                            <td>USD</td>
                            <td>Price</td>
                            <td>{'<='}</td>
                            <td>3400</td>
                            <td>
                                <button
                                    type='button'
                                    onClick={this.hideModal}
                                    className='btn btn-info btn-sm'
                                    data-dismiss='modal'>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    type='button'
                                    onClick={this.hideModal}
                                    className='btn btn-danger btn-sm'
                                    data-dismiss='modal'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>BTC</td>
                            <td>USD</td>
                            <td>Perc</td>
                            <td>Over</td>
                            <td>1hrs</td>
                            <td>
                                <button
                                    type='button'
                                    onClick={this.hideModal}
                                    className='btn btn-info btn-sm'
                                    data-dismiss='modal'>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    type='button'
                                    onClick={this.hideModal}
                                    className='btn btn-danger btn-sm'
                                    data-dismiss='modal'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        );

        return (
            <Fragment>
                <div className='card exchange col-sm-10 offset-sm-1 mt-5 p-0'>
                    <h5 className='card-header'>Alerts</h5>
                    <div
                        className='card-body table-responsive p-0'
                        id='alert-table'>
                        {' '}
                        {this.props.isAuth ? (
                            alerts
                        ) : (
                            <p className='m-3'>Login to view alerts</p>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Alerts;
