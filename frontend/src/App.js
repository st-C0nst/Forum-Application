import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeForums } from './reducers/forumsReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'

import Users from './components/Users'
import User from './components/User'
import Forum from './components/Forum'
import LoginForm from './components/LoginForm'
import ForumForm from './components/ForumForm'
import Notification from './components/Notification'
import Navigation from './components/Navigation'

import { Divider, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { lightBlue } from '@material-ui/core/colors'
import SignUpForm from './components/SignUpForm'
import Button from '@material-ui/core/Button'
import AddIcon from '@mui/icons-material/Add'


const theme = createTheme({
  palette: {
    primary: {
      main: '#0e4686'
    },
    secondary: lightBlue,
  }
})

const App = () => {
  const dispatch = useDispatch()
  const forums = useSelector((state) => state.forums)
  const message = useSelector((state) => state.message)
  const currentUser = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    dispatch(initializeForums())
  }, [dispatch])


  const matchUserId = useMatch('/users/:id')
  const userForums = matchUserId
    ? forums.filter((forum) => forum.user.id === matchUserId.params.id)
    : null

  const matchForumId = useMatch('/forums/:id')
  const currentForum = matchForumId
    ? forums.find((forum) => {
      return forum.id === matchForumId.params.id
    })
    : null

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Notification message={message} />
        <Routes>
          <Route path="/users/:id" element={<User forums={userForums} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/forums/:id" element={<Forum forum={currentForum} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/forums/create" element={<ForumForm />} />
          <Route path="/" element= {
            <>
              <Typography color="primary" variant="h3" >
                Forums:
              </Typography>
              {currentUser === null ? (
                <Typography color="secondary">
                    Login to create posts
                </Typography>
              ) : (
                <Button
                  component={ Link }
                  to='/forums/create'
                  variant="outlined"
                  endIcon={<AddIcon />}
                  color="primary">
                  Create Forum
                </Button>
              )}
              <List
                component="nav"
                aria-label="mailbox folders"
              >
                {forums
                  .sort((a, b) => b.likes - a.likes)
                  .map((forum) => {
                    return (
                      <>
                        <ListItem
                          key={forum.id}
                          button
                          onClick={() => navigate(`forums/${forum.id}`)}
                          sx={{
                            maxWidth: 300
                          }}
                        >
                          <ListItemText primary={forum.title} secondary={`By ${forum.author}`}
                            primaryTypographyProps={{
                              variant: 'subtitle2',
                              style: {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }
                            }}
                            secondaryTypographyProps={{
                              variant: 'caption',
                              style: {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }
                            }}/>
                        </ListItem>
                        <Divider />
                      </>
                    )
                  })}
              </List>
            </>
          } />
        </Routes>
      </Container>
    </ ThemeProvider>
  )
}

export default App
