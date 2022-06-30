const Course = ({course: {name, parts}}) => {
  const exercisesCount = parts.reduce((total, {exercises}) => {
    const result = total + exercises
    return result
  }, 0)

  return (
    <div>
      <h2>{name}</h2>
      {parts.map(({id, name, exercises}) => (
        <p key={id}>{name}: {exercises}</p>
      ))}
      <p><strong>Number of exercises: {exercisesCount}</strong></p>
    </div>
  )
}

export default Course
