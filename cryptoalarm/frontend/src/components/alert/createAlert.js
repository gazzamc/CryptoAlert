import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { createAlert } from '../../api/auth';
import { callAPI } from '../../api/api';

class CreatAlert extends Component {
    constructor() {
        super();
        this.state = {
            fiatOps: [],
            coinOps: [],
            redirect: null,
            status: null,
        };
    }

    componentDidMount() {
        this.getFiat();
        this.getCoins();
    }

    getFiat = async () => {
        let path = '/api/fiat';
        await callAPI((res) => {
            let temp = [];
            res.data.map((fiat) => {
                temp.push([fiat.pk, fiat.name]);
            });
            this.setState({ fiatOps: temp });
        }, path);
    };

    getCoins = async () => {
        let path = '/api/crypto';

        await callAPI((res) => {
            let temp = [];
            res.data.map((coin) => {
                temp.push([coin.pk, coin.name]);
            });

            this.setState({ coinOps: temp });
        }, path);
    };

    setOptions = () => {
        document.getElementById('perc-options').toggleAttribute('hidden');
        document.getElementById('price-options').toggleAttribute('hidden');
    };

    create = async (e) => {
        e.preventDefault();
        let is_above;
        let price;
        let perc_change;
        let interval;

        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        let crypto_id = document.getElementById('FormControlSelectCrypto')
            .value;
        let fiat_id = document.getElementById('FormControlSelectFiat').value;
        let alert_type = document.getElementById('FormControlSelectType').value;

        if (alert_type == 1) {
            is_above = document.getElementById('FormControlSelectParam').value;
            price = document.getElementById('price-input').value;
        } else {
            is_above = false;
            price = null;
            perc_change = document.getElementById('percentage-input').value;
            interval = document.getElementById('percentage-interval-input')
                .value;
        }

        const body = JSON.stringify({
            user_id,
            crypto_id,
            fiat_id,
            alert_type,
            is_above,
            price,
            perc_change,
            interval,
        });

        await createAlert(
            (res) => {
                this.setState({ status: res.status });
                if (res.status == 201) {
                    this.setState({ redirect: '/' });
                }
                if (res.status == 400) {
                    if (res.data.price) {
                        this.setState({ error: res.data.price[0] });
                    } else if (res.data.perc_change) {
                        this.setState({ error: res.data.perc_change[0] });
                    } else if (res.data.interval) {
                        this.setState({ error: res.data.interval[0] });
                    }
                }
            },
            token,
            body
        );
    };

    cancel = (e) => {
        e.preventDefault();
        this.setState({ redirect: '/' });
    };

    render() {
        const fiat = this.state.fiatOps.map(([id, name]) => {
            return (
                <option value={id} key={id}>
                    {name}
                </option>
            );
        });

        const coins = this.state.coinOps.map(([id, name]) => {
            return (
                <option value={id} key={id}>
                    {name}
                </option>
            );
        });

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <Fragment>
                <div className='col-sm-4 wrapper'>
                    <div className='card exchange col-sm-12 mt-5 p-0'>
                        <h5 className='card-header'>Create Alert</h5>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='FormControlSelectCrypto'>
                                        Crypto Currency
                                    </label>
                                    <select
                                        className='form-control'
                                        id='FormControlSelectCrypto'
                                        onChange={this.setCryptoSel}>
                                        {coins}
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='FormControlSelectFiat'>
                                        Fiat Currency
                                    </label>
                                    <select
                                        className='form-control'
                                        id='FormControlSelectFiat'>
                                        {fiat}
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='FormControlSelectType'>
                                        Type
                                    </label>
                                    <select
                                        className='form-control'
                                        id='FormControlSelectType'
                                        onChange={this.setOptions}>
                                        <option value='1'>Price Change</option>
                                        <option value='2'>
                                            Percentage Change
                                        </option>
                                    </select>
                                </div>
                                {/* Options for price */}
                                <div id='price-options'>
                                    <div className='form-group'>
                                        <label htmlFor='FormControlSelectParam'>
                                            Parameter
                                        </label>
                                        <select
                                            className='form-control'
                                            id='FormControlSelectParam'>
                                            <option value='true'>{'>='}</option>
                                            <option value='false'>
                                                {'<='}
                                            </option>
                                        </select>
                                    </div>
                                    <div className='form-group row'>
                                        <label
                                            htmlFor='price-input'
                                            className='col-2 col-form-label'>
                                            Price
                                        </label>
                                        <div className='col-10'>
                                            <input
                                                className='form-control'
                                                type='number'
                                                min='1'
                                                id='price-input'
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Options for percentage */}
                                <div id='perc-options' hidden>
                                    <div className='form-group row'>
                                        <label
                                            htmlFor='price-input'
                                            className='col-6 col-form-label'>
                                            Percentage
                                        </label>
                                        <div className='col-10'>
                                            <input
                                                className='form-control'
                                                type='number'
                                                min='0'
                                                max='100'
                                                step='.01'
                                                id='percentage-input'
                                            />
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label
                                            htmlFor='price-input'
                                            className='col-6 col-form-label'>
                                            Interval (Hours)
                                        </label>
                                        <div className='col-10'>
                                            <input
                                                className='form-control'
                                                type='number'
                                                min='1'
                                                max='24'
                                                pattern='[0-9]'
                                                id='percentage-interval-input'
                                            />
                                        </div>
                                    </div>
                                </div>

                                <small
                                    id='error'
                                    className='form-text text-danger'>
                                    {this.state.error}
                                </small>
                                <div className='col-sm-12 mt-5 mb-5'></div>
                                <button
                                    type='submit'
                                    onClick={this.create}
                                    className='btn btn-success mr-2'>
                                    Create
                                </button>
                                <button
                                    type='submit'
                                    onClick={this.cancel}
                                    className='btn btn-danger'>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreatAlert;
