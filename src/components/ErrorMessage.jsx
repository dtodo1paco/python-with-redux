import React, { Component } from 'react'
import { connect } from 'react-redux';
import { resetErrors } from 'actions/app'

import { translate } from 'modules/translator';

class ErrorMessage  extends Component {

    constructor(props) {
        super(props);
        this.handleDismissClick = this.handleDismissClick.bind(this);
        this.state = {
            timer: setTimeout(this.handleDismissClick, 5000)
        }
    }

    handleDismissClick (e) {
        clearTimeout(this.state.timer);
        this.props.resetErrors();
        if (typeof e !== 'undefined') {
            e.preventDefault();
        }
    }

    render () {
        const { errorMessage } = this.props;
        const separatorPos = errorMessage.indexOf('_');
        let error = errorMessage;
        let number = '';
        if (separatorPos > 0) {
            error = errorMessage.substring(0,separatorPos);
            number = ": " + errorMessage.substring(separatorPos+1);
        }
        const errMsg = translate(error) + number;
        if (errMsg == null || errMsg.length === 0) {
            return null;
        }
        return (
            <div className="error-message">
                <span className="dismiss" onClick={this.handleDismissClick}>&times;</span>
                <strong>{errMsg}</strong>
            </div>
        )
    }
}

export default connect(null, {
    resetErrors
})(ErrorMessage);