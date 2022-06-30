import logo from './logo.svg';
import './App.css';

const CONTENT = {
  course: "Half Stack application development",
  parts: [
    {
      title: "Fundamentals of React",
      exercises: 10
    }, {
      title: "Using props to pass data",
      exercises: 7
    }, {
      title: "State of a component",
      exercises: 14
    }
  ]
}

const Header = ({course}) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1>{course}</h1>
  </header>
)

const Content = ({parts}) => (
  <div className="App-container">
    {parts.map(({title, exercises}) => (
      <p key={title}>{title}: {exercises}</p>
    ))}
  </div>
);

const Total = ({parts}) => {
  const exercisesCount = parts.reduce((total, {exercises}) => {
    const result = total + exercises
    return result
  }, 0)

  return (<div className="App-container">Number of exercises {exercisesCount}</div>)
}

const App = () => (
  <div>
    <Header course={CONTENT.course} />
    <Content parts={CONTENT.parts} />
    <Total parts={CONTENT.parts}/>
  </div>
)

export default App
