import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import Typography from '@mui/material/Toolbar'
import HistoryEdu from '@mui/icons-material/HistoryEdu'

const Logo = () => (
  <Fragment>
    <HistoryEdu />
    <Typography
      variant="h6"
      component={NavLink}
      to="/"
      sx={{
        pr: 0,
        pl: 1.5,
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none'
      }}
    >
      BlogApp
    </Typography>
  </Fragment>
)

export default Logo
