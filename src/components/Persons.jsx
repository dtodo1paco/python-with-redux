import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import config from 'config/client';
import { fetchData } from 'actions/persons'

import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import DataTable from 'components/DataTable'
import ErrorMessage from 'components/ErrorMessage';
import NoDataFound from 'components/NoDataFound';

const  headers = [
    {label: 'Apellidos', field: 'surname'},
    {label: 'Nombre', field: 'name'},
    {label: 'Edad', field: 'age'},
    {label: 'Acciones', field: 'id'},
];

export class Persons extends Component {
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.fetchData(config.endpoint + 'person/all');
    }

    render() {
        const { isFetching, error, items } = this.props;

        if (isFetching) {
            return <CircularProgress key="progress-persons" id="progress-persons" />
        }
        if (error) {
            return <ErrorMessage errorMessage={error}></ErrorMessage>
        }
        if (items.length === 0) {
            return <NoDataFound
                refresh={() => this.loadData()}
                message='no.data.message'
                title='no.data.subtitle'
                subtitle='no.data.title' />
        }
        return (
            <div className='component'>
                <DataTable selectable={false} headers={headers} data={items}
                    pageSize={10} model='person'
                    url={config.endpoint + 'person/'} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.persons.items.map( (item) => {
            return {
                _id: item.id,
                name: item.name,
                surname: item.surname,
                age: item.birthday?moment().diff(item.birthday, 'years'):''
            }
        }),
        error: state.app.errors.page,
        isFetching: state.app.loading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Persons);
