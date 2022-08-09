import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/allUsersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const forums = useSelector((state) => state.forums)
  useEffect(() => {
    dispatch(getUsers())
  }, [forums])
  return (
    <div className="users">
      <h2>Users</h2>
      {users && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>forums created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.forums.length}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Users
