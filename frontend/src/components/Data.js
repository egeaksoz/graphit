import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Datum } from './Datum';

export class Data extends Component {
    render() {
        return this.props.data.map((datum) => (
            <Datum key={datum.id} datum={datum}></Datum>
        ))
    }
}

export default Data;

Data.propTypes = {
    data: PropTypes.array.isRequired,
}