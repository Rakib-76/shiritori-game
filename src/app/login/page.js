import React from 'react'
import LoginForm from '../components/LoginForm'

export default function page() {
  return (
    <div>
        <h1 className='text-3xl text-center'>
            This is Social Login
            <LoginForm/>
        </h1>
    </div>
  )
}
