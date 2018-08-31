import React, { PureComponent } from 'react';
import {
    DataTable as MdDataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
    TablePagination
    } from 'react-md';

import DataRow from 'components/DataRow';
import { sort_by } from 'modules/arraysUtil.js';

export default class DataTable extends React.Component {

    constructor(props) {
        super(props);
        let headers = props.headers;
        this.state = {
            headers: headers,
            data: props.data,
            pageSize: props.pageSize,
            slicedData: props.data.slice(0, props.pageSize),
            order: {
                asc: true,
                field: 'location_name'
            }
        }
        this.handlePagination = this.handlePagination.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            slicedData: nextProps.data.slice(0, nextProps.pageSize),
        })
    }

    handlePagination (start, rowsPerPage) {
        this.setState({ slicedData: this.state.data.slice(start, start + rowsPerPage) });
    }

    handleSort (field) {
        const ascending = !this.state.order.asc;
        let sortedItems = this.state.slicedData.slice();
        sortedItems = sortedItems.sort(sort_by(field.toLowerCase(), ascending, null));
        this.setState( {
            order: {
                asc: ascending,
                field: field
            },
            slicedData: sortedItems
        });
    };

    render() {
        const { slicedData, headers, pageSize } = this.state;
        const rowsPerPageLabel = this.props.mobile ? 'Registros' : 'Registros por página';
        return (
            <MdDataTable baseId="simple-pagination">
                <TableHeader>
                    <TableRow selectable={this.props.selectable}>
                        {
                        headers.map(header =>
                            <TableColumn key={header.field}
                                sorted={this.state.order.field === header.field && this.state.order.asc}
                                role="button" onClick={() => this.handleSort(header.field)}>
                                {header.label}
                            </TableColumn>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        slicedData.map( (item, i) => {
                            return <DataRow key={i} index={i} item={item} selectable={this.props.selectable}
                                url={this.props.url} model={this.props.model} />
                        })
                    }
                </TableBody>
                <TablePagination rows={this.state.data.length} rowsPerPageLabel={rowsPerPageLabel}
                    onPagination={this.handlePagination} />
            </MdDataTable>
        );
    }
}