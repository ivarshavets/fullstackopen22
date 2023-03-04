import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import StyledLink from '@mui/material/Link'

const UsersList = () => {
  const { status, list } = useSelector(({ users }) => users)

  if (status === 'loading') {
    return <CircularProgress />
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
          {list.map(({ id, username, name, blogs }) => (
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
