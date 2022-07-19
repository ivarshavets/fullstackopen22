# Project Phonebook

## Tasks
Version 1 ([exercise 2.6-2.10](https://fullstackopen.com/en/part2/forms#exercises-2-6-2-10))
1. Option to add a person with the name and phone to the phonebook.
2. Prevent the user from being able to add names that already exist in the phonebook. Issue a warning with the alert command when such an action is attempted
3. Implement a search field to filter the list of people by name. The filtering logic is case insensitive.
4. Extract smaller components

Version 2 ([exercise 2.11-2.14](https://fullstackopen.com/en/part2/getting_data_from_server#exercises-2-11-2-14))
1. Add json-server. Add intial state in the db.json
2. Fetch initial state of the data from the server using the axios-library

Version 3 ([exercises 2.15.-2.18](https://fullstackopen.com/en/part2/altering_data_in_server#exercises-2-15-2-18))
1. Save the numbers that are added to the phonebook to a backend server.
2. Extract the code that handles the communication with the backend into its own module
3. Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the window.confirm method
4. Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. If the person's information is already in the phonebook, the application can confirm the action from the user

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
