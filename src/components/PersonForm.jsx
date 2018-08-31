import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import config from 'config/client';
import { fetchData as fetchPersons } from 'actions/persons'
import { fetchData as fetchLocations } from 'actions/locations'

import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardActions } from "react-md/lib/Cards"
import { Button } from 'react-md/lib/Buttons';
import { TextField } from 'react-md/lib/TextFields';
import { DatePicker } from 'react-md/lib/Pickers';
import { SelectField } from 'react-md';
import { Grid, Cell } from 'react-md';


import { translate } from 'modules/translator';

export class PersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            data: {
                name: '',
                surname: '',
                birthday: '',
                father_id: '',
                mother_id: '',
                location_id: '',
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectorChange = this.handleSelectorChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.fetchPersons(config.endpoint + 'person/all');
        this.props.fetchLocations(config.endpoint + 'location/all');
    }

    isValid(data) {
        let validName = data.name && data.name.length > 1;
        let validSurname = data.surname && data.surname.length > 1;
        let validBirthday = data.birthday && data.birthday.length > 7;
        let validLocation = data.location_id && data.location_id.length === 36;
        return validName && validSurname && validBirthday && validLocation;
    }

    handleDateChange(dateString, dateObject, event) {
        this.handleChange(dateString, 'birthday');
    }
    handleSelectorChange(value, index, e, next) {
        this.handleChange(value, next.name);
    }
    handleInputChange(value, e) {
        this.handleChange(value, e.target.name);
    }
    handleChange(value, field) {
        let data = this.state.data;
        data[field] = value;
        this.setState({
            data: data,
            valid: this.isValid(data)
        });
    }
    returnData () {
        return this.state;
    }

    render() {
        const { name, surname, location_id, father_id, mother_id } = this.state;
        return (
            <form action="#" id="person-form" >
                <Grid className="person-grid">
                    <Cell size={6} tabletSize={8} phoneSize={4}>
                        <TextField
                            autoComplete='name'
                            required
                            errorText='Por favor, introduce un nombre válido'
                            id="name"
                            name="name"
                            label={translate('name')}
                            lineDirection="center"
                            value={name}
                            onChange={this.handleInputChange}
                            className="md-cell md-cell--12 md-cell--4-phone md-cell--8-tablet"
                        />
                        <DatePicker
                            id="birthday"
                            name="birthday"
                            label="Fecha de nacimiento"
                            className="md-full-width md-text-field-container--input md-cell md-cell--12 md-cell--4-phone md-cell--8-tablet"
                            displayMode="portrait"
                            disableScrollLocking
                            required
                            portal
                            lastChild
                            renderNode={null}
                            fullWidth={false}
                            firstDayOfWeek={1}
                            cancelLabel={translate('cancel')}
                            okLabel={translate('ok')}
                            autoOk
                            onChange={this.handleDateChange}
                        />
                        <SelectField
                            id="father_id"
                            name="father_id"
                            label={translate('father')}
                            value={father_id}
                            onChange={this.handleSelectorChange}
                            menuItems={this.props.persons}
                            itemLabel="fullname"
                            itemValue="id"
                            className="md-full-width md-text-field-container--input md-cell md-cell--12 md-cell--4-phone md-cell--8-tablet"
                        />
                    </Cell>
                    <Cell size={6} tabletSize={8} phoneSize={4}>
                        <TextField
                            autoComplete='family-name'
                            required
                            errorText='Por favor, introduce apellidos válidos'
                            id="surname"
                            name="surname"
                            label="Apellido"
                            lineDirection="center"
                            value={surname}
                            onChange={this.handleInputChange}
                            className="md-cell md-cell--12 md-cell--4-phone md-cell--8-tablet"
                        />
                        <SelectField
                            id="location_id"
                            name="location_id"
                            label={translate('location')}
                            value={location_id}
                            onChange={this.handleSelectorChange}
                            menuItems={this.props.locations}
                            itemLabel="name"
                            itemValue="id"
                            className="md-full-width md-text-field-container--input md-cell md-cell--12 md-cell--4-phone md-cell--8-tablet"
                        />
                        <SelectField
                            id="mother_id"
                            name="mother_id"
                            label={translate('mother')}
                            value={mother_id}
                            onChange={this.handleSelectorChange}
                            menuItems={this.props.persons}
                            itemLabel="fullname"
                            itemValue="id"
                            className="md-full-width md-text-field-container--input md-cell md-cell--12 md-cell--4-phone md-cell--8-tablet"
                        />

                    </Cell>
                </Grid>
            </form>
        )
    }
}

PersonForm.propTypes = {
};




const mapStateToProps = (state) => {
    return {
        persons: state.persons.items.map( (item) => {
            const age = item.birthday?moment().diff(item.birthday, 'years'):''
            return {
                fullname: item.name + ' ' + item.surname + " ("+age+")",
                id: item.id
            }
        }),
        locations: state.locations.items
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPersons: (url) => dispatch(fetchPersons(url)),
        fetchLocations: (url) => dispatch(fetchLocations(url))
    };
};
export default connect(mapStateToProps,mapDispatchToProps, null, { withRef: true })(PersonForm);
