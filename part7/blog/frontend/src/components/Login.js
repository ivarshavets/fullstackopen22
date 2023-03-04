import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import LoginForm from '../components/LoginForm'
import FlashMessage from '../components/FlashMessage'

const Login = () => (
  <Container maxWidth="xs" sx={{ textAlign: 'center' }}>
    <FlashMessage />
    <Typography variant="h1">Login to application</Typography>
    <LoginForm />
  </Container>
)

export default Login
