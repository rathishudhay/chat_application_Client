import React, { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'

function UserDetails() {
  const { user } = useContext(UserContext);
  return (
    <>
      <img src={user.imageUrl} className="userImg" />
      <div className="username">{user.name}</div>
      <div className="email">{user.email}</div>
    </>
  )
}

export default UserDetails
