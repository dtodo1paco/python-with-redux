import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import Locations from './components/Locations';
import Persons from './components/Persons';
import About from './components/About';
import LocationForm from 'components/LocationForm';
import PersonForm from 'components/PersonForm';
import NotFoundPage from 'components/NotFoundPage';

export const pages = [
    {
        "path":"/",
        "label":"Población",
        "component": Home,
        "isEditable":false,
        "header": {
            title: "Población",
            subtitle: "Esta es la población de cada zona"
        }
    },
    {
        "path":"/location",
        "label":"Zonas",
        "component": Locations,
        "isEditable":true,
        "form": {
            "title": "Nueva Zona",
            "component": <LocationForm ref={(comp) => {window.forms['location'] = comp}} />
        },
        "header":{title: "Zonas", subtitle: "Estas son las zonas registradas en el sistema"}
    },
    {
        "path":"/person",
        "label":"Personas",
        "component": Persons,
        "isEditable":true,
        "form": {
            "title": "Nueva Persona",
            "component": <PersonForm ref={(comp) => {window.forms['person'] = comp}} />
        },
        "header":{title: "Personas", subtitle: "Estas son las personas registradas en el sistema"}
    },
]

const routes = (
  <App>
    <Switch>
        {
            pages.map( (page) => {
                return <Route key={page.path} exact path={page.path} component={page.component} />
            })
        }
        <Route component={NotFoundPage} />
    </Switch>
  </App>
)

export { routes };