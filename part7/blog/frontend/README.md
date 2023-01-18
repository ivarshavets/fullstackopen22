# Blog App

**App deployed to Heroku:**

**App deployed to Fly:**

## Tasks

Fullstackopen exercises [7.9-7.21](https://fullstackopen.com/en/part7/exercises_extending_the_bloglist#exercises-7-9-7-21)

1. Prettier as utomatic code formatting.

- Install Prettier: `npm install --save-dev --save-exact prettier`
- Create `.prettierrc.json` with rules to let editors and other tools know you are using Prettier
- Create `.prettierignore`
- Install packages which are in charge of combining Prettier and ESLint: `npm install --save-dev eslint-config-prettier eslint-plugin-prettier`
- Set the Prettier rules in the ESLint configuration:

```
{
  "extends": ["plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  },
}
```

2. Introduce Redux instead of internal React component state.
3. Store the information about blog posts in the Redux store.
4. Expand your solution so that it is again possible to like and delete a blog.
5. Store the information about the signed-in user in the Redux store.
6. Implement a view to the application that displays all of the basic information related to users.
7. Implement a view for individual users that displays all of the blog posts added by that user.
8. Implement a separate view for blog posts.
9. Implement a navigation menu for the application.
10. Implement the functionality for commenting on blog posts. Comments should be anonymous, not associated with the user who left the comment.
11. Extend your application so that users can add comments to blog posts from the frontend.
12. Improve the appearance of your application.

---

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eslint -- --fix`

Inspecting and validating all files and apply authomatic fixes.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Advanced configuration

[More on advanced configuration by Create React App](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
