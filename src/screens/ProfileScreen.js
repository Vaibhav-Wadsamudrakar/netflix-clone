import React from 'react'
import './ProfileScreen.css'
import Nav from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import PlansScreen from './PlansScreen'

function ProfileScreen() {
  const user=useSelector(selectUser);

  return (
    <div className='profileScreen'>
      <Nav/>
      <div className="profileScreen__body">
        <h1>edit profile</h1>
        <div className="profileScreen__info">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
          <div className="profileScreen__details">
              <h2>{user.email}</h2>
              <div className="profileScreen__plans">
                <h1>Plans</h1>
                <PlansScreen/>
                <button className='profileScreen__signOut' onClick={()=>{auth.signOut()}}>Sign Out</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen