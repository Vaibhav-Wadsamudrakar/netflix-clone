import React, { useState } from 'react'
import './LoginScreen.css'
import SignUpScreen from './SignUpScreen'

function LoginScreen() {
    const [signIn,setSignIn]=useState(false)
    return (
        <div className='loginScreen'>
            <div className="loginScreen__background">
                <img className='loginScreen__logo' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                <button onClick={()=>setSignIn(true)} className='loginScreen__button' >Sign In</button>
                <div className="loginScreen__gradient"/>
            </div>
            <div className="loginScreen__body">
                {signIn?(<SignUpScreen/>):(
                    <>
                    <h2>Welcome back!</h2>
                    <h1>Unlimited movies, TV shows and more</h1>
                    <p >Watch anywhere.Cancel anytime.</p>
                    <h3>Ready to watch?Enter your email to create or restart your membersip.</h3>
                    <div className="loginScreen__input">
                        <form >
                            <input type="email" placeholder='Email Address'/>
                            <button className='loginScreen__getStarted' onClick={()=>setSignIn(true)}>GET STARTED</button>
                        </form>
                    </div>
                    </>
                )}
                
            </div>
        </div>
    )
}

export default LoginScreen