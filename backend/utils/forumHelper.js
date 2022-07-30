const topLikedPost = (posts) => {
  return posts.reduce((curr, post) => curr.likes > post.likes ? curr : post)
}

const totalPostLikes = (posts) => {
  return posts.reduce((sum, post) => (sum + post.likes), 0)
}


module.exports = {
  totalPostLikes,
  topLikedPost
}