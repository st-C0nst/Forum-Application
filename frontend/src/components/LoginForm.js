import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'

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

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
    navigate('/')
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
          Login
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
            style={{ marginBottom: '2' }}
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
          />
          <ButtonGroup>
            <Button
              type='submit'
              variant="contained"
              color="primary"
              id="login-button"
            >
          LOGIN
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              color="primary"
              id="signup-button"
            >
          SIGN UP
            </Button>
          </ButtonGroup>
        </form>
      </Grid>
      <Grid item>
        <Typography variant="h4" color="primary">
          Guest User:
        </Typography>
        <Typography variant="h6" color="primary">
          username: Guest
          <br></br>
          password: ts1eu2G3
        </Typography>
      </Grid>
    </Grid>
  )
}

export default LoginForm
