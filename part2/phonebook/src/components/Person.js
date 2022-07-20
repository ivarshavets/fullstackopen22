import personsService from "../services/persons"
import useFlashNotification from '../hooks/useNotification'

const Person = ({item : {id, name, number}, onDelete, showNotification}) => {
  // const [message, showFlashMessage] = useFlashNotification()

  const handleDelete = () => {
    if (window.confirm("Do you really want to delete the person")) {
      personsService.deletePerson(id)
        .then(() => {
          onDelete(id)
          showNotification('Deleted successfully!')
        })
        .catch(() => showNotification('Something went wrong', 'error'))
    }
  }

  return (
    <li>
      Name: {name}, phone: {number}
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default Person
