const Anecdote = ({anecdote}) => {
  // // in case redux store useSelector can be used in order to remove anecdotes param
  // const {id} = useParams()
  // const anecdote = useSelector(() =>
  //   anecdotes.find(anecdote => anecdote.id === Number(id)))
  return (
    anecdote && (
    <div style={{margin: '0 0 1em 1em'}}>
      <p>{anecdote.content}</p>
      <p>Author: {anecdote.author}</p>
      <p>Info: <a href={anecdote.info}>{anecdote.info}</a></p>
      <div><strong>Votes: {anecdote.votes}</strong></div>
    </div>
  ))
}

export default Anecdote
