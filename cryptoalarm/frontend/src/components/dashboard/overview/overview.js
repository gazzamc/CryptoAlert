import React, { Component, Fragment } from 'react';
import { callAPI } from './../../../api/api';
import { Line, defaults } from 'react-chartjs-2';

class Overview extends Component {
    constructor() {
        super();
        this.state = {
            chart: {},
            fiat: [],
            crypto: [],
            status: null,
        };
    }

    /* getFiatCurrencies = async () => {
        let path = '/api/fiat';

        await callAPI((res) => {
            let arr = [];
            res.data.map((currency) => {
                arr.push({ currency });

                this.setState({ fiat: arr });
            });

            if (this.state.status === 200) {
            }
        }, path);
    }; */

    getFiatCurrencies = async () => {
        let path = '/api/history';
        await callAPI((res) => {
            this.setState({ fiat: res.data });
        }, path);
    };

    componentDidMount() {
        this.getFiatCurrencies();
    }

    render() {
        let data = {
            labels: ['First', 'Second'],
            datasets: [
                {
                    label: 'My First dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: 'My Second dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                },
            ],
        };

        const state = {
            datasets: [
                {
                    fill: false,
                    lineTension: 0.5,
                    borderWidth: 2,
                    data: this.state.fiat,
                },
            ],
        };

        return (
            <Fragment>
                <div className='card exchange mt-5'>
                    <h5 className='card-header'>Overview</h5>
                    <div className='card-body'>
                        <Line data={data} height={100} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Overview;
