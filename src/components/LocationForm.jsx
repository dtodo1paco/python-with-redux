import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardActions } from "react-md/lib/Cards"
import { Button } from 'react-md/lib/Buttons';
import { TextField } from 'react-md/lib/TextFields';

export class LocationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            data: {
                name: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            data: {
                name: value
            },
            valid: value.length > 0
        });
    }

    returnData () {
        return this.state;
    }

    render() {
        const { name } = this.state;
        return (
            <form action="#" className="md-grid" id="location-form" >
                <TextField
                    required
                    errorText='Por favor, introduce un nombre'
                    id="name"
                    name="name"
                    label="Nombre"
                    lineDirection="center"
                    value={name}
                    onChange={this.handleChange}
                    className="md-cell md-cell--12 md-cell--4-phone md-cell--8-tablet"
                />
            </form>
        )
    }
}

LocationForm.propTypes = {
};



export default LocationForm;