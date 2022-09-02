## Preparing the development environment

### Installing

### `yarn install`

## Running the json-server

**json-server npm package needs to be installed globally using the following command**

Run `npm i -g json-server`

Run `json-server --watch -p 5000 data/db.json`
To run the json-server on port 5000 which is used as the baseUrl in env

## Client Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Libraries Used

### Redux Toolkit

For state management and keeping the api calls organized in one place.

### Axios

I find it more convenient and have been using it over fetchApi as my work demands it as well.
