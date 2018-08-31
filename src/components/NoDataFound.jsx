import React from 'react';
import { Card, CardTitle, CardText, Slider } from 'react-md';
import { FontIcon } from 'react-md';
import { translate } from 'modules/translator';

const NoDataFound = (props) => (
    <Card className="md-block-centered">
        <CardTitle title={translate(props.title)} subtitle={translate(props.subtitle)} />
        <CardText>
            <span>
                {translate(props.message)}
            </span>
            <FontIcon onClick={props.refresh}>refresh</FontIcon>
        </CardText>
    </Card>
);

export default NoDataFound;