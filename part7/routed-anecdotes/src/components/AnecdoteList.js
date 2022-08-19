import { Link, Outlet } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => {
  const masterStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr'
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <div style={masterStyles}>
        <ul>
          {anecdotes.map(anecdote =>
            <li key={anecdote.id} >
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </li>)}
        </ul>
        <Outlet />
      </div>
    </div>
  )
}

export default AnecdoteList
