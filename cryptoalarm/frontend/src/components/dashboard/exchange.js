import React, { Component, Fragment } from 'react';
import { callAPI } from '../../api/getExchange';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

class Exchange extends Component {
    constructor() {
        super();
        this.state = {
            columns: [],
            rows: [],
            status: null,
            lastModDate: null,
        };
    }

    getFiatCurrencies = async () => {
        let path = '/api/fiat';

        await callAPI((res) => {
            let arr = [
                {
                    Header: 'Crypto',
                    accessor: 'crypto',
                    Cell: (row) => (
                        <div
                            style={{
                                textAlign: 'center',
                            }}>
                            {row.value}
                        </div>
                    ),
                },
            ];
            res.data.map((currency) => {
                arr.push({
                    Header: currency.name,
                    accessor: currency.name,
                    Cell: (row) => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                    ),
                });

                this.setState({ status: res.status });
            });

            if (this.state.status === 200) {
                this.setState({ columns: arr });
                this.getExchanges();
            }
        }, path);
    };

    getExchanges = async () => {
        let path = '/api/exchange';

        await callAPI((res) => {
            let date;
            let arr = [];
            let dict = {};

            res.data.map((crypto, idx) => {
                date = crypto.date_modified;

                // dump dict before next row to avoid overwrite
                if (idx % (this.state.columns.length - 1) === 0) {
                    if (idx !== 0) {
                        arr.push(dict);
                        dict = {};
                    }
                    dict.crypto = crypto.crypto_name;
                }
                dict[crypto.fiat_name] = crypto.rate;

                // grab last price before end of map
                if (idx == res.data.length - 1) {
                    arr.push(dict);
                    dict = {};
                }
            });
            if (this.state.status === 200) {
                this.setState({ rows: arr, lastModDate: date });
                this.getTimeDiff();
            }
        }, path);
    };

    getTimeDiff = () => {
        let timeDiff;
        let now = new Date();
        let convToISO = now.toISOString();
        let last = this.state.lastModDate;

        let d1 = new Date(convToISO);
        let d2 = new Date(last);

        let diff = (d1 - d2) / 1000;

        if (diff / 60 < 60) {
            timeDiff = `${Math.floor(diff / 60)} mins ago`;
        } else if (diff / 3600 < 60) {
            timeDiff = `${Math.floor(diff / 3600)} hrs ago`;
        }

        this.props.lastUpdated(timeDiff);
    };

    componentDidMount() {
        this.getFiatCurrencies();
    }

    componentDidUpdate() {}

    render() {
        return (
            <ReactTable
                data={this.state.rows}
                columns={this.state.columns}
                defaultPageSize={3}
                showPagination={false}
            />
        );
    }
}

export default Exchange;
