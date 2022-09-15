import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';

export class Month extends Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.month.title}</Table.Cell>
                <Table.Cell>{this.props.month.price}</Table.Cell>
                <Table.Cell><Button onClick={this.props.delButton.bind(this, this.props.month.title)}>Delete</Button></Table.Cell>
            </Table.Row>
        )
    }
}

Month.propTypes = {
    month: PropTypes.object.isRequired,
    delButton: PropTypes.func.isRequired
}

export default Month