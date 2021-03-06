# Python with Redux 

Simple web application to manage population of different locations. It manages:
![demo](https://github.com/dtodo1paco/python-with-redux/raw/master/screenshots/demo.gif)

- Locations (CRUD): simple entity with name field
- Persons (CRUD): related to locations
- Census to present related data

## Live Demo
https://my-population.herokuapp.com/

## Technical features
* ES6 transpiling via Webpack
* Hot module reloading via Webpack Dev Server
* State management via Redux
* Tests via Pytest and Jest
* Linting via Pylint and Eslint
* Travis CI for automatic testing and linting

For production usage, take a look at:
http://flask.pocoo.org/docs/1.0/deploying/

## Setup
In order to run python and npm you have to install some binaries.
```pre
Python 3.5+ : https://www.python.org/downloads/
npm 6.4+    : https://www.npmjs.com/get-npm
```

## Dependencies

To install the complete web application, you can run:

```bash
git clone https://github.com/dtodo1paco/python-with-redux
cd python-with-redux
npm install --no-optional
pip install -r requirements.txt
```

If you need virtualenv for python, take a look at:
https://docs.python-guide.org/dev/virtualenvs/

## Quickstart

Once the dependencies are installed, you can start the api with the following command:

- (only at first) Create a python virtual env (in your $HOME directory)
```bash
export WORKON_HOME=~/Envs
mkvirtualenv python-with-redux
```
- Start python virtual env
```bash
source ~/Envs/python-with-redux/bin/activate
```
- start the backend dev server in background
```bash
cd server && make run &
```

That will start the server on port 5000 with stat reloading.
You can now explore the api navigating to http://localhost:5000
![api](https://github.com/dtodo1paco/python-with-redux/raw/master/screenshots/api.png)

To run the development server with hot module reloading, run:

```bash
npm run start
```

That will start the webpack dev server on port 3000.
Frontend is available at http://localhost:3000

## Production build
Just type 
```bash
npm run-script production
```
And for start the server, use 
```bash
cd server && make prod
```
*REMEMBER* to set environment variables before running
![api](https://github.com/dtodo1paco/python-with-redux/raw/master/screenshots/env.png)

## Tests

To run the Javascript tests (located in `src/tests/`), run:

```bash
npm run jest
```

To run the Python tests (located in `server/tests/`), run:

```bash
cd server && make tests
```