# Project Phonebook

## Tasks
Exercise 2.6-2.10 - create a simple phonebook.
1. Option to add a person with the name and phone to the phonebook.
2. Prevent the user from being able to add names that already exist in the phonebook. Issue a warning with the alert command when such an action is attempted
3. Implement a search field to filter the list of people by name. The filtering logic is case insensitive.
4. Extract smaller components

Exercise 2.11-2.14
1. Add json-server. Add intial state in the db.json
2. Fetch initial state of the data from the server using the axios-library
3. 

## Start the app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npx json-server --port 3001 --watch db.json`
or
### `npm run server`
Starts the [json-server](https://github.com/typicode/json-server) on port 3001 (3000 by default)
Open [http://localhost:3001/notes](http://localhost:3001/notes) to view it in your browser.
