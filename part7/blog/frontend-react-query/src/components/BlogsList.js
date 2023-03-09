import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import CircularProgress from '@mui/material/CircularProgress'

import { selectSortedBlogs } from '../reducers/blogsSlice'

const BlogsList = () => {
  const { status } = useSelector(({ blogs }) => blogs)
  const sortedBlogs = useSelector(selectSortedBlogs)

  if (status === 'loading') {
    return <CircularProgress />
  }

  if (!sortedBlogs.length) {
    return <Typography>There are no blogs</Typography>
  }

  return (
    <div>
      <Typography variant="h1">Blogs</Typography>
      <List dense>
        {sortedBlogs.map(({ id, title }) => (
          <ListItem key={id}>
            <ListItemButton component={Link} to={`blogs/${id}`}>
              {title}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogsList
