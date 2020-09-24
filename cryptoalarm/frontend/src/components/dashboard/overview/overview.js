import React, { Component, Fragment } from 'react';

class Overview extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return (
            <Fragment>
                <div className='card exchange mt-5'>
                    <h5 className='card-header'>Overview</h5>
                    <div className='card-body'>
                        <canvas id='chLine' height='100'></canvas>
                        <span id='noData' hidden>
                            No Data Available
                        </span>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Overview;
