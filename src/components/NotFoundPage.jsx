import React from 'react';
import { Link } from 'react-router-dom';
import { CardTitle, Media, MediaOverlay, Paper } from 'react-md';

import PageNotFound from 'assets/images/lost.gif';

const homeLink = <Link to="/" className="not-found">Empezar de nuevo</Link>

const NotFoundPage = () => (
    <Paper className="md-cell md-cell--12 md-grid md-block-centered">
        <section className="md-cell--4 md-block-centered">
            <Media aspectRatio="4-3">
                <img src={PageNotFound} alt="Página no encontrada" className="not-found"/>
                <MediaOverlay>
                    <CardTitle title={homeLink} />
                </MediaOverlay>
            </Media>
        </section>
    </Paper>

);
export default NotFoundPage;


