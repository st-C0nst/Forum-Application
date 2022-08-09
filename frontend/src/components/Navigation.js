import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import Tooltip from '@mui/material/Tooltip'
import LoginIcon from '@mui/icons-material/Login'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/login')
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} >
            Forum App
          </Typography>
          {currentUser !== null ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <>
                    <Typography>
                      {currentUser.name}
                    </Typography>
                    <Tooltip title="Logout">
                      <IconButton
                        onClick={handleLogout}
                        aria-label="logout"
                      >
                        <LogoutIcon style={{ color: '#FFFFFF' }} fontSize='large' />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              />
            </FormGroup>
          ) : (
            <FormGroup>
              <FormControlLabel
                control={
                  <Tooltip title="Login">
                    <IconButton
                      onClick={handleLogout}
                      aria-label="login"
                    >
                      <LoginIcon style={{ color: '#FFFFFF' }} fontSize='large' />
                    </IconButton>
                  </Tooltip>
                }
              />
            </FormGroup>
          )}
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button variant="contained">
              <Link to="/" style={{ color: '#fff' }}>
                Forums
              </Link>
            </Button>
            <Button variant="contained">
              <Link to="/users" style={{ color: '#fff' }}>
                Users
              </Link>
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation
