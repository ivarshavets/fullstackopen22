import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
// import AnecdoteForm from './components/AnecdoteFormWithConnect'
import VisibilityFilter from './components/VisibilityFilter'
import Search from './components/Search'
// import Search from './components/SearchWithConnect'
import Notification from './components/Notification'
// import Notification from './components/NotificationWithConnect'
// import Notification from './components/NotificationWithThunk'
// import Notification from './components/NotificationWithState'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <VisibilityFilter />
      <Search />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
