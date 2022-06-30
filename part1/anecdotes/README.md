# Project: Anecdote of the day and most voted anecdote

## Tasks:
1. Display a random anecdote by clicking a button
2. Add option to vote for an anecdote and show the votes

NB store the votes of each anecdote into an array or object in the component's state.
Remember that the correct way of updating state stored in complex data structures like objects and arrays is to make a copy of the state.

You can create a copy of an object like this:

```javascript
const points = { 0: 1, 1: 3, 2: 4, 3: 2 }

const copy = { ...points }
// increment the property 2 value by one
copy[2] += 1
```

OR a copy of an array like this:

```javascript
const points = [1, 4, 6, 3]

const copy = [...points]
// increment the value in position 2 by one
copy[2] += 1
```

3. Display the anecdote with the largest number of votes.
If multiple anecdotes are tied for first place it is sufficient to just show one of them.


## Start the app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
