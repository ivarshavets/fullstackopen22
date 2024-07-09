import reactLogo from './assets/react.svg'
import './App.css'
import {courseName, courseParts} from './data'
import {PartsProps, Part} from './types'

const Header = ({courseName}:{courseName: string}) => (
  <header className="header">
    <img src={reactLogo} className="logo react" alt="React logo" />
    <h1>{courseName}</h1>
  </header>
)

const CoursePart = ({part}:{part:Part}) => {
  const assertNever = (value:never):never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  const getDetails = (part: Part) => {
    switch(part.kind) {
      case 'basic':
        return <div>{part.description}</div>
      case 'group':
        return <div>{part.groupProjectCount}</div>
      case 'background':
        return (
          <div>
            <div>{part.description}</div>
            <div>{part.backgroundMaterial}</div>
          </div>
        )
      case 'special':
        return (
          <div>
            <div>{part.description}</div>
            <div>required skills: {part.requirements.join(', ')}</div>
          </div>
        )
      default:
        // const _exhaustiveCheck: never = part;
        // return _exhaustiveCheck
        return assertNever(part)
    }
  }

  return (
    <div>
      <h4>{part.name} (exercises {part.exerciseCount})</h4>
      <div>{getDetails(part)}</div>
    </div>
  )
}

const Content = ({parts}:PartsProps) => (
  <div className="card">
    {parts.map(part => (
      <CoursePart key={part.name} part={part}/>
    ))}
  </div>
);

const Total = ({parts}:PartsProps) => {
  const exercisesCount = parts.reduce((total, {exerciseCount}) => {
    const result = total + exerciseCount
    return result
  }, 0)

  return (<div className="card">Number of exercises {exercisesCount}</div>)
}

const App = () => (
  <div>
    <Header courseName={courseName} />
    <Content parts={courseParts} />
    <Total parts={courseParts}/>
  </div>
)

export default App
