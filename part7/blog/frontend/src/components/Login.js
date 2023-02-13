import LoginForm from '../components/LoginForm'
import FlashMessage from '../components/FlashMessage'

const Login = () => (
  <div className="container">
    <FlashMessage />
    <h2>Login to application</h2>
    <LoginForm />
  </div>
)

export default Login
