import React from 'react'
import { doSocialLogin } from '../actions'

export default function LoginForm() {
    return (
        <form action={doSocialLogin}>
            <button
                className='bg-pink-400 text-white p-1 rounded-md m-1 text-lg'
                type="submit"
                name="action"
                value="google">
                Sign In with Google
            </button>
            <button
                className='bg-black text-white p-1 rounded-md m-1 text-lg'
                type="submit"
                name="action"
                value="github">
                Sign In with GitHub
            </button>
        </form>
    )
}
