import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData } from 'actions/census';
import config from 'config/client';

const  headers = [
    {label: 'Zona', field: 'location_name'},
    {label: 'Población',    field: 'population'}
];

import { Badge, Chip } from 'react-md';

import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import DataTable from 'components/DataTable'
import ErrorMessage from 'components/ErrorMessage';
import NoDataFound from 'components/NoDataFound';


export class Home extends Component {
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.fetchData(config.endpoint + 'census/');
    }
    render() {
        const { isFetching, items, error } = this.props;

        if (error) {
            return <ErrorMessage errorMessage={this.props.error}></ErrorMessage>
        }
        if (isFetching) {
            return <CircularProgress key="progress-census" id="progress-census" />
        }
        if (items.length === 0) {
            return <NoDataFound
                refresh={() => this.loadData()}
                message='no.data.message'
                title='no.data.subtitle'
                subtitle='no.data.title' />
        }

        return (
            <div className='population'>
                {
                    items.map(function(item) {
                        const id = "population-of-"+item.location_name;
                        return <Badge className="population-item" badgeContent={item.population} primary badgeId={id} key={id}>
                            <Chip className="population-location" label={item.location_name} />
                        </Badge>
                    })
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.census.items,
        error: state.app.errors.page,
        isFetching: state.app.loading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);
