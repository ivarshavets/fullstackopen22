import { connect } from 'react-redux'

const Notification = ({notification: {message, type}}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: type === 'success' ? '#4dbe3a' : '#be3a3a'
  }

  if (!message) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(mapStateToProps)(Notification)
