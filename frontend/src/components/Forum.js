import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import forumService from '../services/forums'
import { addLikeToForum, deleteForum, addComment } from '../reducers/forumsReducer'
import { setSuccessMessage, setErrorMessage } from '../reducers/messageReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
const Forum = ({ forum }) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [allowRemove, setAllowRemove] = useState(false)

  useEffect(() => {
    const user = forumService.getUserInfo()
    const forumUser = forum.user.id || forum.user
    setAllowRemove(forumUser === user.id)
  }, [])

  const addLike = () => {
    try {
      dispatch(addLikeToForum(forum))
      dispatch(
        setSuccessMessage(
          `new like to forum ${forum.title} by ${forum.author} added`
        )
      )
    } catch (error) {
      dispatch(
        setErrorMessage(
          `a new like to forum ${forum.title} by ${forum.author} NOT added`
        )
      )
    }
  }

  const handleRemove = () => {
    if (window.confirm(`Remove forum ${forum.title} by ${forum.author}`)) {
      try {
        dispatch(
          setSuccessMessage(`forum ${forum.title} by ${forum.author} delete`)
        )
        dispatch(deleteForum(forum.id))
        navigate('/')
      } catch (error) {
        dispatch(
          setErrorMessage(`forum ${forum.title} by ${forum.author} NOT deleted`)
        )
      }
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addComment(forum.id, e.target.comment.value))
    e.target.comment.value = ''
  }

  return (
    <Card sx={{ width: '100%' }}>
      {allowRemove && (<CardHeader
        action={
          <IconButton onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        }
        sx={{ float: 'right', width: '5%' }}
      />)}
      <CardContent>
        <div style={{  wordWrap: 'break-word', }}>
          <Typography  variant="h4">
            {forum.title}
          </Typography>
          <Typography gutterBottom variant="h6" >
            {`By ${forum.author}, ${forum.createdAt.split('T')[0]}`}
          </Typography>
        </div>
      </CardContent>
      <CardContent>
        <div style={{  wordWrap: 'break-word', }}>
          <Typography variant="body2" color="text.secondary" class="word-break">
            {forum.content}
          </Typography>
          <br></br>
          <a href={forum.url}>{forum.url}</a>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={addLike}>
          <FavoriteIcon />
        </IconButton>
        <Typography>
          {forum.likes}
        </Typography>
        <Typography marginLeft={'auto'}>
          Comments
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={handleAddComment}>
            <input type="text" name="comment" />
            <button type="submit">add comment</button>
          </form>
          <ul>
            {forum.comments.map((comment, index) => (
              <li key={index} style={{ wordWrap: 'break-word', }}>{comment} </li>
            ))}
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Forum