# Phonebook backend

## Tasks
Exercise [3.1-3.6](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6).
1. Implement a Node application that returns a hardcoded list of phonebook at the address _http://localhost:3001api/persons_.
2. Implement an info page at the address _http://localhost:3001/info_, which shows the time that the request was received and how many entries are in the phonebook at the time of processing the request.

## App initiating
1. Create a new template for an application with `npm init` command.
2. Define dedicated _npm script_ in _package.json_ to start the app: `npm start` command instead of `start node index.js`.
3. Install express library with `npm install express` command.
4. Installing `nodemon` as a development dependency to enable automatic update of the changes on the server.
```
npm install --save-dev nodemon
```
The application can be started with nodemon like this:
```
node_modules/.bin/nodemon index.js
```
5. Add the _npm scrips_ in _package.json_ to run the app with nodemon:
```
{
  "dev": "nodemon index.js"
}
```

## Start the app
### `npm run dev`
Start the server in the development mode
