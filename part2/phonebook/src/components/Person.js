import personsService from "../services/persons"

const Person = ({item : {id, name, number}, onDelete}) => {
  const handleDelete = () => {
    if (window.confirm("Do you really want to delete the person")) {
      personsService.deletePerson(id)
        .then(() => {
          onDelete(id)
          alert('Deleted successfully!')
        })
        .catch(() => alert('something is wrong :('))
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
