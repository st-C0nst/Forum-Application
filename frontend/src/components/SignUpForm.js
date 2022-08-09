import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userCreate } from '../reducers/userReducer'
import { setErrorMessage } from '../reducers/messageReducer'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [usernameError, setUserError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [nameError, setNameError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  const handleLogin = (event) => {
    event.preventDefault()
    setNameError(false)
    setPasswordError(false)
    setUserError(false)

    if (username.length < 3) {
      setUserError(true)
      dispatch(setErrorMessage('username must at least 6 characters'))
    } else if (name.length < 3) {
      setNameError(true)
      dispatch(setErrorMessage('name must be at least 2 characters'))
    } else if (password.length < 3) {
      setPasswordError(true)
      dispatch(setErrorMessage('password must be at least 8 characters'))
    }
    else {
      dispatch(userCreate(username, name, password))
      setUsername('')
      setPassword('')
      setName('')
      navigate('/login')
    }
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: '50vh' }}
      spacing={5}
    >
      <Grid item>
        <Typography variant="h3" color="primary">
          Sign Up
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleLogin}>
          <TextField
            className={classes.field}
            id="standard-basic"
            label="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            required
            variant='outlined'
            color='secondary'
            error={usernameError}
          />
          <TextField
            className={classes.field}
            id="standard-basic"
            label="name"
            value={name}
            name="Name"
            onChange={({ target }) => setName(target.value)}
            required
            variant='outlined'
            color='secondary'
            error={nameError}
          />
          <TextField
            className={classes.field}
            id="standard-basic"
            label="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            required
            variant='outlined'
            color='secondary'
            error={passwordError}
          />
          <ButtonGroup>
            <Button
              type='submit'
              variant="contained"
              color="primary"
              id="login-button"
            >
          SUBMIT
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="secondary"
              id="signup-button"
            >
          CANCEL
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
    </Grid>
  )
}

export default SignUpForm
