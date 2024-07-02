# Patientor app
Developing a backend for an existing project called Patientor
1. Setup the project ([Exercises 9.8-9.9 of fullstackopen](https://fullstackopen.com/en/part9/first_steps_with_type_script#exercises-9-8-9-9))
- Init the project and install the typescript package
```
npm init
npm install typescript --save-dev
```
- add TypeScript's Native Compiler `tsc` to scripts, which can help us initialize the project by generating our tsconfig.json
```
"scripts": {
    "tsc": "tsc"
  },
```
- Initialize tsconfig.json
```
npm run tsc -- --init
```
- Add Express, types and eslint. Configure eslint rules.
```
npm install express
npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser
```
- Set up our development and add the scripts to run the app and lint
```
npm install --save-dev ts-node-dev
```
```
"scripts": {
  "start": "ts-node index.ts",
  "dev": "ts-node-dev index.ts",
  "lint": "eslint --ext .ts ."
}
```
- Create data type Patient and set up the `GET` endpoint `/api/patients` which returns all the patients to the frontend, excluding field `ssn`. Used a [utility type ](https://www.typescriptlang.org/docs/handbook/utility-types.html)to make sure you are selecting and returning only the wanted fields.
In this exercise, it's assumed that field `gender` has type `string`.
-   - Allow requests from other origins to backend by using Node's cors middleware.
```
npm install cors

const cors = require('cors')
app.use(cors())
```

2. Setup the project ([Exercises 9.8-9.9 of fullstackopen](https://fullstackopen.com/en/part9/first_steps_with_type_script#exercises-9-8-9-9))
