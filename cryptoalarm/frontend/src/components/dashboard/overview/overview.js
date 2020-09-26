import React, { Component, Fragment } from 'react';
import { callAPI } from './../../../api/api';
import { Line, defaults } from 'react-chartjs-2';

class Overview extends Component {
    constructor() {
        super();
        this.state = {
            chartUSD: [],
            chartEUR: [],
            chartGBP: [],
            fiat: [],
            crypto: [],
            labels: [],
            status: null,
        };
    }

    getFiatCurrencies = async () => {
        let path = '/api/fiat';

        await callAPI((res) => {
            let arr = [];
            res.data.map((fiat) => {
                arr.push(fiat.name);
                this.setState({ fiat: arr });
            });

            if (this.state.status === 200) {
            }
        }, path);
    };

    getExcHistory = async (crypto, fiat) => {
        let now = new Date();
        let nowISO = now.toISOString('en-GB');
        let yesterday = new Date(now - 86400 * 1000).toISOString('en-GB');
        let path = `/api/history/?crypto=${crypto}&fiat=${fiat}&date_time_range_before=${nowISO}&date_time_range_after=${yesterday}`;
        await callAPI((res) => {
            let tempRates = [];
            let tempLabels = [];
            res.data.map((history) => {
                let time = new Date(history.date_added);
                tempRates.push(history.rate);
                tempLabels.push(time.toLocaleString(['en-GB']));
            });

            if (fiat == 'USD') {
                this.setState({ chartUSD: tempRates, labels: tempLabels });
            } else if (fiat == 'EUR') {
                this.setState({ chartEUR: tempRates, labels: tempLabels });
            } else if (fiat == 'GBP') {
                this.setState({ chartGBP: tempRates, labels: tempLabels });
            }
        }, path);
    };

    componentDidMount() {
        this.getFiatCurrencies();
    }

    componentDidUpdate() {
        if (this.state.chartUSD.length == 0) {
            for (let i in this.state.fiat) {
                this.getExcHistory('BTC', this.state.fiat[i]);
            }
        }
    }

    render() {
        let data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'BTC-USD',
                    fill: true,
                    data: this.state.chartUSD,
                },
                {
                    label: 'BTC-EUR',
                    data: this.state.chartEUR,
                    hidden: true,
                },
                {
                    label: 'BTC-GBP',
                    data: this.state.chartGBP,
                    hidden: true,
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
