import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    Button,
    Card,
    CardActions,
    CardText,
    CardTitle,
    } from 'react-md';

import { pages } from 'routes';

import { sendData, addItem } from 'actions/send';
import { setErrorModal } from 'actions/app'
import { FormModalDialog } from 'components/FormModalDialog';



const getPageId = (location) => {
    if (location)
        return location.substring(1);
    else
        return '';
}

export class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current_page: pages.find(function (page) {
                return this.props.pathname === page.path;
            }, this)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({current_page: pages.find(function (page) {
            return nextProps.pathname === page.path;
        }, this)});
    }

    getHeader() {
        if (this.state.current_page)
            return this.state.current_page.header;
        else
            return {title:"", subtitle:""};
    }
    getForm() {
        if (this.state.current_page)
            return this.state.current_page.form;
        else
            return {title:"Bad news", component:null};
    }


    isEditable() {
        return Object.is(this.state.current_page, undefined) ? false : this.state.current_page.isEditable;
    }

    render() {
        const header = this.getHeader();
        const form = this.getForm();
        return (
            <Card className="md-block-centered">
                <CardActions expander className="topnav">
                    {
                        pages.map( (page) => {
                            return <Link key={page.path} to={page.path}>{page.label}</Link>
                        })
                    }
                </CardActions>
                <CardTitle
                    title={header.title}
                    subtitle={header.subtitle}
                />
                <CardText expandable>
                    <CardActions>
                        {
                        // better using refs on components and invoking something like a refresh method on components
                        }
                        <Button flat onClick={ () => {window.location = window.location}}>Actualizar</Button>
                        {this.isEditable()
                            &&
                            <FormModalDialog for={getPageId(this.props.pathname)} title={form.title}
                                component={form.component} sendData={this.props.sendData}
                                error={this.props.err} setErrorMessage={this.props.setErrorModal}
                                addItemToState={this.props.addItemToState}
                            />}
                    </CardActions>
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pathname: state.router.location.pathname,
        err: state.app.errors.modal
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendData: (url, data) => dispatch(sendData(url, data)),
        setErrorModal: (message) => dispatch(setErrorModal(message)),
        addItemToState: (model, item) => dispatch(addItem(model, item))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
