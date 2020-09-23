import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    setOptions = (event) => {
        document.getElementById('perc-options').toggleAttribute('hidden');
        document.getElementById('price-options').toggleAttribute('hidden');
    };

    create = () => {
        logoutUser(this.state.token);
    };

    cancel = () => {};

    render() {
        return (
            <Fragment>
                <div className='col-sm-4 wrapper'>
                    <div className='card exchange col-sm-12 mt-5'>
                        <h5 className='card-header'>Create Alert</h5>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='FormControlSelectCrypto'>
                                        Crypto Currency
                                    </label>
                                    <select
                                        className='form-control'
                                        id='FormControlSelectCrypto'>
                                        <option>BTC</option>
                                        <option>LTC</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='FormControlSelectFiat'>
                                        Fiat Currency
                                    </label>
                                    <select
                                        className='form-control'
                                        id='FormControlSelectFiat'>
                                        <option>USD</option>
                                        <option>EUR</option>
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
                                        <option>Price Change</option>
                                        <option>Percentage Change</option>
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
                                            <option>{'>='}</option>
                                            <option>{'<='}</option>
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
                                    className='form-text text-danger'></small>
                                <div className='col-sm-12 mt-5 mb-5'></div>
                                <button
                                    type='submit'
                                    className='btn btn-success'>
                                    Create
                                </button>
                                <button
                                    type='submit'
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

export default Header;
