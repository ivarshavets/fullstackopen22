# Blog frontend

**App deployed to Heroku:**

**App deployed to Fly:**

## Tasks
Exercise [5.1-5.4](https://fullstackopen.com/en/part5/login_in_frontend#exercises-5-1-5-4)
1. Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state user.
2. Persist the logged in state by using the [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage).
- Values in the local storage are persisted even when the page is rerendered. The storage is [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin)-specific so each web application has its own storage.
- Values saved to the storage are DOMstrings, so we cannot save a JavaScript object as it is. The object has to be parsed to JSON first, with the method JSON.stringify. Correspondingly, when a JSON object is read from the local storage, it has to be parsed back to JavaScript with JSON.parse.
- Saving a token in the local storage might contain a security risk if the application has a security vulnerability that allows [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) attacks and leaking a token. A XSS attack is possible if the application would allow a user to inject arbitrary JavaScript code (e.g. using a form) that the app would then execute. When using React in a sensible manner it should not be possible since [React sanitizes](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks) all text that it renders, meaning that it is not executing the rendered content as JavaScript.
- It has been suggested that the identity of a signed in user should be saved as [httpOnly cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies), so that JavaScript code could not have any access to the token. The drawback of this solution is that it would make implementing SPA-applications a bit more complex. One would need at least to implement a separate page for logging in. However it is good to notice that even the use of a httpOnly cookies does not guarantee anything. It has even been suggested that [httpOnly cookies are not any safer](https://academind.com/tutorials/localstorage-vs-cookies-xss/) than the use of local storage.

Exercise [5.5-5.10](https://fullstackopen.com/en/part5/props_children_and_proptypes#exercises-5-5-5-10)
Expand the functionality by adding delete functionality, like functionality, toggling the visibility of blogs's details and add form, sorting blogs list by the numbers of likes.

Exercise [5.11-5.12](https://fullstackopen.com/en/part5/props_children_and_proptypes#exercises-5-11-5-12)
1. Define PropTypes
2. Add ESlint to the project.
- Create-react-app has installed ESlint to the project by default, so all that's left to do is to define the desired configuration in the _.eslintrc.js_ file.
- create _.eslintignore_ file to the repository root to ignore node_modules, build folders and .eslintrc.js file when linting
- To avoid undesired and irrelevant linter errors we will install the [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest) package:
```
npm install --save-dev eslint-plugin-jest
```
- create npm script to run the lint: `{"eslint": "eslint ."}`

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
