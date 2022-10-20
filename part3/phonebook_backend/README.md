# Phonebook backend

**App deployed to Heroku: https://phonebook-fe22.herokuapp.com/**

**App deployed to Fly: https://phonebook-fullstackopen22.fly.dev/**

## Tasks
Exercise [3.1-3.6](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6)
0. Use Express lib to build a backend server. It offers a more easy interface to work with Node's built-in http web server.
1. Implement a Node application that returns a hardcoded list of phonebook at the address _http://localhost:3001api/persons_.
2. Implement an info page at the address _http://localhost:3001/info_, which shows the time that the request was received and how many entries are in the phonebook at the time of processing the request.
3. Implement the functionality for displaying the information for a single phonebook entry.
4. Implement functionality that makes it possible to delete a single phonebook entry.
5. Expand the backend so that new phonebook entries can be added.
6. Implement error handling for creating new entrie.

Exercise [3.7-3.8](https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-7-3-8)

7. Add the morgan middleware to the application for logging.
8. Configure morgan so that it also shows the data sent in HTTP POST requests.

Exercise [3.9-3.11](https://fullstackopen.com/en/part3/deploying_app_to_internet#exercises-3-9-3-11)

9. Make the backend work with the phonebook frontend from the exercises of the previous part.
10. Deploy the backend to the internet (Fly.io/Heroku).
11. Generate a production build of your frontend, and add it to the internet application.

Exercise [3.12](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercise-3-12)

12. Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

Exercise [3.13-3.14](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-13-3-14)

13. Using Mangoose fetching all phonebook entries from the MongoDB database. Extract all Mongoose-specific code into its own module.
14. Change the backend so that new entries are saved to the database.

Exercise [3.15-3.18](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-15-3-18)

15. Change the backend so that deleting phonebook entries is reflected in the database.
16. Move the error handling of the application to a new error handler middleware.
17. If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.
18. Update the handling of the api/persons/:id and info routes

## App initiating
1. Create a new template for an application with `npm init` command.
2. Define dedicated _npm script_ in _package.json_ to start the app: `npm start` command instead of `start node index.js`.
3. Install express library with `npm install express` command.
4. Installing `nodemon` as a development dependency to enable automatic update of the changes on the server.
```
npm install --save-dev nodemon
```
- The application can be started with nodemon like this:
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

### `npm start`
Runs the frontend app in the development mode from **part2/phonebook**.
The react app from the _part2/phonebook_ running in the browser in localhost:3000 fetches the data from _node/express-server_ that runs in localhost:3001.

### `run build:ui`
Builds the frontend and copies the production version under the backend repository

### `npm run deploy`
Releases the current backend to Heroku

### `npm run deploy:full`
Combines these two and contains the necessary git commands to update the backend repository

## Deployment process
### Fly.io
1. Authorisation
```
fly auth login
```
2. Initializing an app by running the following command in the root directory of the app
```
fly launch
```
3. Open the app
```
fly open
```
4. Deploy to prod
```
fly deploy
```

### Heroku
1. Add Procfile to the root to tell Heroku how to start the application.
```
web: node index.js
```
2. Create git repository if not initiated before.
3. Create a Heroku application
```
heroku create -a example-app
```
4. Commit your code to the repository (main or master branch) and move it to Heroku with the command:
```
git push heroku main
```

## Creating production build
1. Create frontend production build from the root of the frontend project in part2 folder
```
npm run build
```
2. Serve generated static files from the backend by copying the production build (the build directory) to the root of the backend repository.
```
rm -rf build && cd ../../part2/phonebook/ && npm run build && cp -r build ../../part3/phonebook_backend
```
And configure the backend to show the frontend's main page (the file build/index.html) as its main page: Express middleware static is used for showing static content in the backend `app.use(express.static('build'))`

3. Streamline deploying of the frontend by adding npm-scripts to the package.json of the backend repository to build and deploy

- to Heroku
```
"deploy": "git push heroku main",
"deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy"
```
- to Fly
```
"deploy": "fly deploy",
"deploy:full": "npm run build:ui && npm run deploy"
```
4. Add *Proxy* in order to  make the connection to backend work at _localhost:3001_ after changing the backend address to a relative URL.
In development mode the frontend is at the address _localhost:3000_ but the requests to the backend should go to _localhost:3001/api/persons_.
If the React code does an HTTP request to a server address at _http://localhost:3000_ not managed by the React application itself (i.e. when requests are not about fetching the CSS or JavaScript of the application), the request will be redirected to the server at _http://localhost:3001_.


## Command-line database
### `node mongo.js yourpassword`
Connect to the cloud-based MongoDB database created with MongoDB Atlas and fetching the data.

### `node mongo.js yourpassword <personName> <personNumber>`
Connect to the cloud-based MongoDB database and save the data with the passed params to the db.
