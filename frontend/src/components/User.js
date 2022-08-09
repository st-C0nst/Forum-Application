import React from 'react'

const User = ({ forums }) => {
  if (!forums[0]) {
    return <h2>Nothing to show 👀</h2>
  }
  return (
    <div>
      <h2>{forums[0].user.name}</h2>
      <p>added forums</p>
      <ul>
        {forums.map((forum) => {
          return <li key={forum.id}>{forum.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
