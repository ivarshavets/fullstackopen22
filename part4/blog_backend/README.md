# Blog backend

**App deployed to Heroku:**

**App deployed to Fly:**

## Tasks
Exercise [4.1-4.2](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-1-4-2)
1. Having a draft of a project, turn it into a functioning npm project.
2. Refactor the application into separate modules and structure the project.

Exercise [4.3-4.7](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#exercises-4-3-4-7)
Create a collection of helper functions and unit tests for the blog list.

Exercise [4.8-4.12](https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12)
1. Use the supertest package for writing a test and cover route handlers with unit tests.
2. Refactor the route handler to use the async/await syntax instead of promises.

Exercise [4.15-4.23](https://fullstackopen.com/en/part4/token_authentication#exercises-4-15-4-23)
1. Implement user administration
- create new users by doing a HTTP POST with _bcrypt_ lib to encrypt the password
- add validation. Username restrictions can be done with Mongoose validations. Password validation should be validated in controler because the password received by the backend and the password hash saved to the database are not the same thing.
2. Implement token authentication

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
- Add the _npm scrips_ in _package.json_ to run the app with nodemon:
```
{
  "dev": "nodemon index.js"
}
```
5. Add env variables and credentials to the _.env_ file, install `dotenv` lib to read them and set configs in _utils/config.js_ to use them.
```
npm install dotenv
```
6. Set MongoDB
- Set MongoDB Atlas service for Mongo database and get MongoDB URI to add to the app.
- Install Mongoose library to manage JavaScript objects as Mongo documents throug its API
```
npm install mongoose
```
- Establish the connection to the db in _mongo.js_ file.
- Define schema for the app data and corresponding model.
7. Defines controllers
8. Install Node's [CORS](https://github.com/expressjs/cors) middleware to allow requests from other origins
```
npm install cors
```

## Setting App for testing
1. Define test env
- set `NODE_ENV` in the npm scripts
- add `cross-env` to achieve cross-platform compatibility (support env mode on Windows), add it as a prod dependacy to avoid errors on web server on Heroku
```
npm install cross-env
```
2. Set Database for testing.
- It could be achieved  by running [Mongo in-memory](https://docs.mongodb.com/manual/core/inmemory/) or by using [Docker](https://www.docker.com/) containers.
- for this project the MongoDB Atlas test database can be used. Define configs for a test db.
3. Add `supertest` package to help us write our tests for testing the API.
```
npm install --save-dev supertest
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

### `npm test`
Run tests

### `npm test -- -t 'when list has only one blog, equals the likes of that'`
Run a single test, providing its name

### `npm test -- tests/blog_api.test.js`
Run a single test, providing the file name

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

## Deploying the database backend to production
For the production usage we have to set the database URL in the service that is hosing our app.

In Fly.io that is done fly `secrets set`:
```
fly secrets set MONGODB_URI='mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority'
```

For Heroku the same is done with the `heroku config:set` command.
```
heroku config:set MONGODB_URI=mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true
```
