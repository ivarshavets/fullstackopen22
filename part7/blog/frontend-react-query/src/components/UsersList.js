import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import StyledLink from '@mui/material/Link'

import userService from '../services/users'
import { useAuthUser } from '../contexts/authUser'

const UsersList = () => {
  const navigate = useNavigate()

  const user = useAuthUser()

  const { data, isLoading, isError, error } = useQuery('users', userService.fetchAllUsers, {
    refetchOnWindowFocus: false,
    retry: false
  })

  if ((!user || !data) && isLoading) {
    return <CircularProgress />
  }

  if (!user && isError && error.response.statusText === 'Unauthorized') {
    navigate('/')
  }

  if (isError) {
    return <Typography>Oops, something is wrong</Typography>
  }

  return (
    <div>
      <Typography variant="h1">Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, username, name, blogs }) => (
            <TableRow key={id}>
              <TableCell>
                <StyledLink component={Link} to={`/users/${id}`}>
                  {name} ({username})
                </StyledLink>
              </TableCell>
              <TableCell>{blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersList
