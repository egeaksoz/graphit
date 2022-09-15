import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import BarChart from './BarChart';

export class Datum extends Component {

    render() {

        let titles = this.props.datum.monthInfo.map((monthInfoComp) => monthInfoComp.title)

        return (
            <div>
                <div>
                    <Header>{this.props.datum.name}</Header>
                    <Header>In Year: {this.props.datum.year}</Header>
                </div>

                <div>
                    <BarChart monthInfo={this.props.datum.monthInfo} titles={titles} size={[500, 500]}></BarChart>
                </div>

            </div>
        )
    }

}

Datum.propTypes = {
    datum: PropTypes.object.isRequired
}


export default Datum;