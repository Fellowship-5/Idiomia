import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from './../../redux/hooks'
import Input from './../../components/Input'
import Button from './../../components/Button'
import Icon from './../../components/Icon'
import Section from './../../components/Section'
import Breadcrumb from './../../components/Breadcrumb'

import { Form, Container } from 'react-bootstrap'
import { LOGIN_INITIAL_DATA } from './../../helpers/formData'

import './Login.css'
import SocialLogin from '../../components/sign up and log in/SocialLogin'

const Login = props => {
  const { loginUser, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState(LOGIN_INITIAL_DATA)

  const { email, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

<<<<<<< HEAD
  const onSubmit = async e => {
    e.preventDefault()
    loginUser({ email, password })
  }
=======
  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };
>>>>>>> 5384a27002b3ea2692c30c85c4243193a12f2dca

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  const handleGoogleSignUp = response => {
    const email = response.tt.$t
    const password = response.googleId
    loginUser({ email, password })
  }
  const handleFacebookSignUp = response => {
    const { email, id } = response
    loginUser({ email, id })
  }
  return (
    <>
      <Section
        id='page-title'
        title={props.title || 'MY ACCOUNT'}
        containerClass='d-flex justify-content-between mx-5 align-items-center'
      >
        <Breadcrumb activePage='Login' />
      </Section>
      <Container className='login-container'>
        <p className='login-title'>
          <Icon icon={'faUnlock'} fixedWidth />
          {props.loginMsg || 'Login to your Account'}
        </p>
        <SocialLogin
          handleFacebookSignUp={handleFacebookSignUp}
          handleGoogleSignUp={handleGoogleSignUp}
        />
        <Form>
          <Input
            label='email'
            id='login-email'
            type='email'
            value={email}
            name='email'
            onChange={onChange}
            placeholder='Email Address'
            required
            autoComplete='off'
            labelClassName='input-form-label my-3'
            className='rounded'
          />
          <Input
            label='password'
            id='login-password'
            type='password'
            value={password}
            name='password'
            onChange={onChange}
            placeholder='Enter your password'
            autoComplete='off'
            minLength='6'
            labelClassName='input-form-label my-3'
            className='mb-3 rounded'
          />
          <Button
            variant='info'
            text='Login'
            onClick={onSubmit}
            color='white'
            type='submit'
            className='button-custom float-right'
            id='user-login-button'
          />
        </Form>

        {!props.signUp || (
          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        )}
      </Container>
    </>
  )
}

export default Login
