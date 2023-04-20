const Notification = ({message}) => {
  if (!message ) {
    return null
  }

  const background = message.type === 'success' ? '#159815' : '#f7a3a3'
  return (
    <div style={{color: 'white', background, padding: '5px'}}>
      {message.text}
    </div>
  )
}

export default Notification
