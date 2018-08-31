import React, { Component } from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import DataTable from 'components/DataTable'
import config from 'config/client';
import { fetchData } from 'actions/locations'
import ErrorMessage from 'components/ErrorMessage';
import NoDataFound from 'components/NoDataFound';

const  headers = [
    {label: 'Nombre', field: 'name'},
    {label: 'Acciones', field: 'id'}
];


export class Locations extends Component {
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.fetchData(config.endpoint + 'location/all');
    }

    render() {
        const { isFetching, err, items } = this.props;

        if (err) {
            return <ErrorMessage errorMessage={this.props.err}></ErrorMessage>
        }
        if (isFetching) {
            return <CircularProgress key="progress-locations" id="progress-locations" />
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
                    pageSize={10} model='location'
                    url={config.endpoint + 'location/'} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.locations.items.map( (item) => ({
            _id: item.id,
            name: item.name
        })),
        err: state.app.errors.page,
        isFetching: state.app.loading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Locations);
