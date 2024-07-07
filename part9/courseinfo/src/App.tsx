import reactLogo from './assets/react.svg'
import './App.css'
import {APP_CONTENT} from './data'

interface Course {
  title: string;
  exercises: number;
}
interface PartsProps {
  parts: Course[]
}

const Header = ({courseName}:{courseName: string}) => (
  <header className="header">
    <img src={reactLogo} className="logo react" alt="React logo" />
    <h1>{courseName}</h1>
  </header>
)

const Content = ({parts}:PartsProps) => (
  <div className="card">
    {parts.map(({title, exercises}) => (
      <p key={title}>{title}: {exercises}</p>
    ))}
  </div>
);

const Total = ({parts}:PartsProps) => {
  const exercisesCount = parts.reduce((total, {exercises}) => {
    const result = total + exercises
    return result
  }, 0)

  return (<div className="card">Number of exercises {exercisesCount}</div>)
}

const App = () => (
  <div>
    <Header courseName={APP_CONTENT.courseName} />
    <Content parts={APP_CONTENT.parts} />
    <Total parts={APP_CONTENT.parts}/>
  </div>
)

export default App
