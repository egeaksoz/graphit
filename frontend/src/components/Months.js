import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Month from './Month';

class Months extends Component {
    render() {
        return this.props.months.map((month) => (
            <Month key={month.id} month={month} delButton={this.props.delButton} />
        ));
    }

}

Months.propTypes = {
    months: PropTypes.array.isRequired,
    delButton: PropTypes.func.isRequired
}

export default Months