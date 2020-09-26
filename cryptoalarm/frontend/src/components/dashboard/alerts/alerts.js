import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { getAlerts, deleteAlert } from '../../../api/auth';

class Alerts extends Component {
    constructor() {
        super();
        this.state = {
            deleted: false,
            alerts: [],
            status: null,
            isAlerts: false,
        };
    }

    alerts = async () => {
        let token = localStorage.getItem('token');

        await getAlerts((res) => {
            let arr = [];
            let dict = {};

            if (res.status == 200) {
                if (res.data.length == 0) {
                    this.setState({
                        isAlerts: false,
                    });
                } else {
                    res.data.map((alert) => {
                        if (alert.alert_type_name == 'price') {
                            dict = {
                                alert_type_name: alert.alert_type_name,
                                crypto_name: alert.crypto_name,
                                fiat_name: alert.fiat_name,
                                is_above: alert.is_above,
                                price: alert.price,
                                pk: alert.pk,
                            };
                            arr.push(dict);
                        } else {
                            dict = {
                                alert_type_name: alert.alert_type_name,
                                crypto_name: alert.crypto_name,
                                fiat_name: alert.fiat_name,
                                interval: alert.interval,
                                perc_change: alert.perc_change,
                                pk: alert.pk,
                            };
                            arr.push(dict);
                        }
                        this.setState({
                            status: res.status,
                            alerts: arr,
                            isAlerts: true,
                        });
                    });
                }
            }
        }, token);
    };

    deleteAlerts = async (e) => {
        let token = localStorage.getItem('token');
        let id = e.target.id;
        await deleteAlert(
            (res) =>
                this.setState({
                    status: res.status,
                }),
            token,
            id
        );

        console.log(this.state.status);

        if (this.state.status == 204) {
            this.setState({ deleted: true });
        }
    };

    componentDidMount() {
        this.alerts();
    }

    componentDidUpdate() {
        if (this.state.deleted) {
            this.alerts();
            this.setState({ deleted: false });
        }
    }

    render() {
        const alerts = this.state.alerts.map((item) => {
            let op;
            let priceOrInt;

            if (item.alert_type_name == 'price') {
                if (item.is_above) {
                    op = <td>{'>='}</td>;
                } else {
                    op = <td>{'<='}</td>;
                }

                priceOrInt = <td>{item.price}</td>;
            } else {
                priceOrInt = <td>{item.perc_change}</td>;
                op = <td>{'%'}</td>;
            }

            return (
                <tr key={item.pk}>
                    <td>{item.crypto_name}</td>
                    <td>{item.fiat_name}</td>
                    {op}
                    {priceOrInt}
                    <td>
                        <Link
                            to={{
                                pathname: `/alert/edit/${item.pk}`,
                                query: `${item.pk}`,
                            }}>
                            <button
                                alert_id={item.pk}
                                type='button'
                                onClick={this.editAlert}
                                className='btn btn-info btn-sm'>
                                Edit
                            </button>
                        </Link>
                    </td>
                    <td>
                        <button
                            id={item.pk}
                            type='button'
                            onClick={this.deleteAlerts}
                            className='btn btn-danger btn-sm'>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        const privateView = (
            <Fragment>
                <Link
                    to='/alert'
                    isAuth={this.props.isAuth}
                    username={this.props.username}>
                    <button
                        type='button'
                        className='btn btn-success ml-1 mt-2 mb-2'
                        data-dismiss='modal'>
                        Add
                    </button>
                </Link>
                <table className='table table-striped'>
                    <tbody>
                        {this.state.isAlerts == false ? (
                            <tr>
                                <td>
                                    It's looking a little lonely here. Click add
                                    :)
                                </td>
                            </tr>
                        ) : (
                            alerts
                        )}
                    </tbody>
                </table>
            </Fragment>
        );

        return (
            <Fragment>
                <div className='card exchange col-sm-9 offset-sm-1 mt-5 p-0'>
                    <h5 className='card-header'>Alerts</h5>
                    <div
                        className='card-body table-responsive p-0'
                        id='alert-table'>
                        {' '}
                        {this.props.isAuth ? (
                            privateView
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
