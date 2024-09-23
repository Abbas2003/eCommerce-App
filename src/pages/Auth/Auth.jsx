import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
        <Button>Login with Google</Button>
        <Button>Login with Github</Button>
        <Button>Login with Email</Button>
        <h1>
            Don't have an account? <Link to={'/auth/signup'}>Signup</Link>
        </h1>
    </div>
  )
}

export default Auth