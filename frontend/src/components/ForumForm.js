
import React ,{ useState }from 'react'
import { Button, ButtonGroup, Container, makeStyles, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@mui/icons-material/Send'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addForum } from '../reducers/forumsReducer'
import { setSuccessMessage, setErrorMessage } from '../reducers/messageReducer'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

const ForumForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [authorError, setAuthorError] = useState(false)
  const [urlError, setUrlError] = useState(false)
  const [contentError, setContentError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const classes = useStyles()


  const onSubmitHandleForm = (event) => {
    event.preventDefault()
    setTitleError(false)
    setAuthorError(false)
    setUrlError(false)
    setContentError(false)

    if (title.length < 1) {
      setTitleError(true)
      dispatch(setErrorMessage('title must be at least 1 characters'))
    } else if (content.length < 1) {
      setContentError(true)
      dispatch(setErrorMessage('content must be at least 1 characters'))
    } else if (author.length < 1) {
      setAuthorError(true)
      dispatch(setErrorMessage('author name must be at least 1 characters'))
    }  else if (url.length < 1) {
      setUrlError(true)
      dispatch(setErrorMessage('URL is required'))
    }
    else {
      dispatch(addForum(title, content, author, url))
      dispatch(setSuccessMessage(`a new forum ${title} by ${author} added`))
      setTitle('')
      setAuthor('')
      setUrl('')
      setContent('')
      navigate('/')
    }
  }

  return (
    <Container>
      <Typography variant="h3" color="primary">
          Create New Post
      </Typography>
      <form onSubmit={onSubmitHandleForm}>
        <TextField
          fullWidth
          className={classes.field}
          id="standard-basic"
          label="title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          required
          variant='outlined'
          color='secondary'
          error={titleError}
        />
        <TextField
          fullWidth
          className={classes.field}
          id="standard-basic"
          label="content"
          value={content}
          multiline
          rows={6}
          name="Content"
          onChange={({ target }) => setContent(target.value)}
          required
          variant='outlined'
          color='secondary'
          error={contentError}
        />
        <TextField
          fullWidth
          className={classes.field}
          id="standard-basic"
          label="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          required
          variant='outlined'
          color='secondary'
          error={authorError}
        />
        <TextField
          fullWidth
          className={classes.field}
          id="standard-basic"
          label="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          required
          variant='outlined'
          color='secondary'
          error={urlError}
        />
        <ButtonGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="submit-forum"
            endIcon={<SendIcon />}
          >
              POST
          </Button>
          <Button
            component={ Link }
            to="/"
            variant="outlined"
            color="secondary"
            id="signup-button"
          >
              CANCEL
          </Button>
        </ButtonGroup>
      </form>
    </Container>
  )
}

export default ForumForm