import { NavLink } from 'react-router-dom'
import { useRef } from 'react'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import { useAddFlashMessage } from '../contexts/flashMessage'
import { useAuthUser, useLogout } from '../contexts/authUser'
import { useToggle } from '../hooks/useToggle'
import Logo from './Logo'

const NAV_LINKS = [
  {
    title: 'Blogs',
    to: '/'
  },
  {
    title: 'Users',
    to: '/users'
  }
]

const Navigation = () => {
  const user = useAuthUser()
  const logout = useLogout()
  const addFlashMessage = useAddFlashMessage()

  const [isMenuOpen, toggleMenu, hideMenu] = useToggle()
  const anchorRef = useRef(null)

  const handleLogout = () => {
    hideMenu()
    logout()
    addFlashMessage('Succeessfully logged out!')
  }

  return (
    <AppBar position="static">
      <Container>
        <Toolbar variant="dense" disableGutters>
          <Logo />
          <Box sx={{ flexGrow: 1, alignSelf: 'stretch', display: 'flex', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(({ title, to }) => (
              <Button
                key={title}
                component={NavLink}
                to={to}
                variant="standard"
                sx={{ color: 'white', borderRadius: 0 }}
              >
                {title}
              </Button>
            ))}
          </Box>
          <div>
            <IconButton size="large" onClick={toggleMenu} color="inherit" ref={anchorRef}>
              <AccountCircle />
            </IconButton>
            {user.name}
            <Menu
              anchorEl={anchorRef.current}
              open={isMenuOpen}
              onClose={hideMenu}
              MenuListProps={{ dense: true }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation
