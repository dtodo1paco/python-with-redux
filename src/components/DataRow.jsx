import React from 'react';
import { FontIcon } from 'react-md';

import {
    TableRow, TableColumn
    } from 'react-md';

import { deleteItem as deleteItemFromServer } from 'actions/delete'
import { deleteItem as deleteLocation } from 'actions/locations'
import { deleteItem as deletePerson } from 'actions/persons'
import { connect } from 'react-redux';

const DataCell = (props) => (
    <TableColumn key={props.key}>{props.value}</TableColumn>
)

const DataRow = (props) => (
    <TableRow key={props.key} selectable={props.selectable}>
        {
            Object.keys(props.item).sort().reverse().map( function(key, i) {
                if (key !== '_id') {
//                    return <DataCell key={i} value={props.item[key]} />;
                    return <TableColumn key={i}>{props.item[key]}</TableColumn>
                } else {
                    return <TableColumn key={i} onClick={
                                () => {
                                    props.deleteItemFromServer(props.url, props.item._id);
                                    let timer = setInterval( () => {
                                        if (props.isDeleting) {
                                            console.log("...waiting for delete to complete...");
                                        } else {
                                            if (props.error == null) {
                                                props.deleteItemFromState(props.index);
                                            } else {
                                                console.log("No borro porque hay error:"+props.error);
                                            }
                                            clearInterval(timer);
                                        }
                                    }, 100);
                                }
                            } >
                        <FontIcon>delete</FontIcon>
                    </TableColumn>
                }
            })
        }

    </TableRow>
)

const mapDispatchToProps = (dispatch, ownProps) => {
    let deleteItemFromState;
    if (ownProps.model === 'location') {
        deleteItemFromState = deleteLocation;
    } else if (ownProps.model === 'person') {
        deleteItemFromState = deletePerson;
    } else {
        console.error("Unable to find deleteItem for model: " + ownProps.model);
    }
    return {
        deleteItemFromServer: (url, id) => dispatch(deleteItemFromServer(url, id)),
        deleteItemFromState: (index) => dispatch(deleteItemFromState(index))
    };
};
const mapStateToProps = (state) => {
    return {
        isDeleting: state.app.loading,
        error: state.app.errorPage
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DataRow);