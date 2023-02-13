import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import userService from '../services/userSorage'
import { setUser } from '../reducers/authSlice'
import { showFlashMessage } from '../reducers/flashMessageSlice'

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ authUser }) => authUser)

  const handleLogout = () => {
    userService.deleteUserFromLocalStorage()
    dispatch(dispatch(setUser(null)))
    dispatch(showFlashMessage('Succeessfully logged out!'))
  }

  return (
    <div className="menu">
      <nav className="menu-nav">
        <NavLink className="menu-nav--item" to="/">
          Blogs
        </NavLink>
        <NavLink className="menu-nav--item" to="/users">
          Users
        </NavLink>
      </nav>
      <div>
        Logged in as <strong>{user.name}</strong>&nbsp;
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Menu
