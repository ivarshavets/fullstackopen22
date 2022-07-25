import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import App from './App'

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)


// // =================
// // Simple version w/o using the hooks-api of the react-redux to share the redux-store with components

// const store = createStore(reducer)

// const App = () => {
//   const handleVoteClick = (type) => {
//     store.dispatch({type})
//   }

//   return (
//     <div>
//       <button onClick={() => handleVoteClick('GOOD')}>good</button>
//       <button onClick={() => handleVoteClick('OK')}>ok</button>
//       <button onClick={() => handleVoteClick('BAD')}>bad</button>
//       <button onClick={() => handleVoteClick('ZERO')}>reset stats</button>
//       <div>good {store.getState().good}</div>
//       <div>ok {store.getState().ok}</div>
//       <div>bad {store.getState().bad}</div>
//     </div>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'))
// const renderApp = () => {
//   root.render(<App />)
// }

// renderApp()
// store.subscribe(renderApp)
