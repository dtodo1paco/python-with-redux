import React from 'react';
import { connect } from 'react-redux';
import config from 'config/client';

import { Button, DialogContainer, List, ListItem } from 'react-md';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import ErrorMessage from 'components/ErrorMessage';

export class FormModalDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        /*
        console.log("MODAL RECEIVING PROPS: " + JSON.stringify(nextProps));
        this.setState( {
            visible: (this.state.visible && !nextProps.visible) || nextProps.error != null
        })
        */
    }

    show () {
        this.setState({ visible: true });
    };

    hide () {
        this.setState({ visible: false });
    };

    handleKeyDown (e) {
        const key = e.which || e.keyCode;
        if (key === 13) {
            e.preventDefault();
            this.handleSubmit();
        }
    };

    handleSubmit() {
        let data;
        if (typeof window.forms[this.props.for].returnData === 'undefined') {
            data = window.forms[this.props.for].getWrappedInstance().state;
        } else {
            data = window.forms[this.props.for].returnData();
        }
        if (data.valid) {
            // clean data to avoid empty string value set
            Object.keys(data.data).forEach( function(key, i) {
                if (data.data[key] == null || data.data[key].length === 0) {
                    delete data.data[key];
                }
            })
            const url = config.endpoint + this.props.for + "/";
            let a = this.props.sendData(url,data.data);
            let timer = setInterval( () => {
                if (this.props.loading) {
                    console.log("...waiting for send to complete...");
                } else {
                    console.log("...send is completed... with error: " + this.props.error);
                    if (this.props.error == null) {
                        this.hide();
                    }
                    clearInterval(timer);
                }
            }, 100);
        } else {
            this.props.setErrorMessage({message: "error.invalid.data"})
        }
    }

    showErrors() {
        if (this.props.error != null) {
            return <ErrorMessage errorMessage={this.props.error}></ErrorMessage>
        }
        return null;
    }

    showAction() {
        if (this.props.loading) {
            return <CircularProgress key="progress-modal" id="progress-modal" />
        } else {
            return <Button id="submit" flat onClick={this.handleSubmit} primary
                className="md-cell md-cell--12 md-cell--4-phone md-cell--8-tablet">
                Enviar
            </Button>
        }
    }

    render() {
        const { visible } = this.state;
        const { title, component } = this.props;
        return (
            <div>
                <Button raised onClick={this.show}>Nueva</Button>
                <DialogContainer
                    id="forms-modal-dialog"
                    visible={visible}
                    title={title}
                    onHide={this.hide}
                    dialogClassName="modal-dialog"
                >
                    <div onKeyDown={this.handleKeyDown}>
                        { component }
                        { this.showAction() }
                        { this.showErrors() }
                    </div>
                </DialogContainer>
            </div>
        );
    }
}

export default FormModalDialog;
//export default connect(mapStateToProps)(FormModalDialog);