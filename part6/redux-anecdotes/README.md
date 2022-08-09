# Project Anecdote

### Version 3 ([exercise 6.9.-6.12](https://fullstackopen.com/en/part6/many_reducers#exercises-6-9-6-12))

1. Add React Toolkit and use Redux Toolkit's `configureStore` to create the store
2. Add `notificationReducer` to show a notification on actions.
3. Extend the application so that it uses the Notification component to display a message for five seconds when the user votes for an anecdote or creates a new anecdote.
4. Implement search by a query for the anecdotes that are displayed to the user.

### Version 4 ([exercise 6.13.-6.14](https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application#exercises-6-13-6-14))

1. Fetch the anecdotes from the backend implemented using json-server.
2. Modify the creation of new anecdotes, so that the anecdotes are stored in the backend.

### Version 5 ([exercise 6.15.-6.18](https://fullstackopen.com/en/part6/communicating_with_server_in_a_redux_application#exercises-6-15-6-18))

1. Modify the initialization of Redux store to happen using asynchronous action creators with the Redux Thunk library.
2. Modify the creation of a new anecdote to happen using asynchronous action creators
3. Save Voting to the backend, using the Redux Thunk library.
4. Improve notification by make an action creator, which enables one to provide the notification as follows:
```
dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
```
The first parameter is the text to be rendered and the second parameter is the time to display the notification given in seconds.

### Version 6 ([exercise 6.19.-6.21](https://fullstackopen.com/en/part6/connect#exercises-6-19-6-21))
1. Modify the Notification component so that it uses the connect function instead of the hooks.
2. Modify Filter and AnecdoteForm components to use the connect function.

*  *  *  *  *

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `npx json-server --port 3001 --watch db.json`
or
### `npm run server`
Starts the [json-server](https://github.com/typicode/json-server) on port 3001 (3000 by default)
Open [http://localhost:3001/notes](http://localhost:3001/notes) to view it in your browser.



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
