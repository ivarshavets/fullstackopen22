const Notification = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'white', background: '#f7a3a3'}}>
      {errorMessage}
    </div>
  )
}

export default Notification
