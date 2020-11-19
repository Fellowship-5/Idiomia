import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import countryList from 'country-list'

import SocialLogin from '../../components/sign up and log in/SocialLogin'
import Input from './../../components/Input'
import Button from './../../components/Button'
import Icon from './../../components/Icon'
import Checkbox from './../../components/Checkbox'
import Section from './../../components/Section'
import Breadcrumb from './../../components/Breadcrumb'
import { REGISTER_INITIAL_DATA } from './../../helpers/formData'
import { validateEmail, validateForm } from './../../helpers/functions'

import { useAuth } from './../../redux/hooks'
import { useTranslation } from 'react-i18next'

import './Register.css'

const Register = () => {
  const { registerUser, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState(REGISTER_INITIAL_DATA)
  const [disabled, setDisabled] = useState(true)

  const { t, i18n } = useTranslation('auth')

  const {
    name,
    email,
    password,
    confirmPassword,
    country,
    newsletters,
    phone,
    errors
  } = formData

  useEffect(() => {
    const isFilled = [name, email, password, confirmPassword].every(data =>
      Boolean(data)
    )
    isFilled ? setDisabled(false) : setDisabled(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  const onChange = e => {
    e.preventDefault()
    const { name, value, checked } = e.target
    switch (name) {
      case 'name':
        errors.name = value.length < 1 ? 'Name must be filled' : ''
        break
      case 'email':
        errors.email = validateEmail(value) ? '' : 'Email is not valid!'
        break
      case 'password':
        errors.password =
          value.length < 6 ? 'Password must be minimum 6 characters!' : ''
        break
      case 'confirmPassword':
        errors.confirmPassword =
          password !== value ? 'Passwords do not match' : ''
        break
      default:
        break
    }
    if (name === 'newsletters') {
      return setFormData({ ...formData, [name]: checked })
    }
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (validateForm(errors)) {
      Object.values(errors).forEach(
        error =>
          error &&
          toast(error, {
            className: 'toast-auth-error',
            position: 'top-left',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
      )
      setFormData({ ...formData, password: '', confirmPassword: '' })
    } else {
      registerUser({
        name,
        email,
        password,
        country,
        newsletters,
        phone
      })
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  const countries = [{ code: 'ZERO' }].concat(countryList.getData())

  const handleGoogleSignUp = response => {
    const email = response.tt.$t
    const name = response.profileObj.name
    const password = response.googleId
    registerUser({
      name,
      email,
      password
    })
  }
  const handleFacebookSignUp = response => {
    const { email, name, id } = response
    registerUser({
      name,
      email,
      password: id
    })
  }
  return (
    <>
      <Section id='register-section' title='MY ACCOUNT'>
        <Breadcrumb activePage='Register' />
      </Section>
      <Container className='register-container'>
        <p className='register-title'>
          <Icon icon={'faUser'} fixedWidth />
          {t('New Sign up? Register for an Account')}
        </p>
        <SocialLogin
          handleFacebookSignUp={handleFacebookSignUp}
          handleGoogleSignUp={handleGoogleSignUp}
          facebookBtnTxt={t('FbLogin')}
          googleBtnTxt={t('GoogleLogin')}
        />
        <Form>
          <Input
            label={t('Name')}
            id='register-name'
            type='text'
            value={name}
            name='name'
            onChange={onChange}
            placeholder={t('Name')}
            autoComplete='off'
            labelClassName='input-form-label my-3'
            className='rounded'
          />
          <Input
            label={t('email')}
            id='register-email'
            type='email'
            value={email}
            name='email'
            onChange={onChange}
            placeholder={t('email')}
            required
            autoComplete='off'
            labelClassName='input-form-label my-3'
            className='rounded'
          />

          <Input
            label={t('password')}
            id='register-password'
            type='password'
            value={password}
            name='password'
            onChange={onChange}
            placeholder={t('password')}
            autoComplete='off'
            minLength='6'
            labelClassName='input-form-label my-3'
            className='rounded'
          />
          <Input
            label={t('password')}
            id='register-password-2'
            type='password'
            value={confirmPassword}
            name='confirmPassword'
            onChange={onChange}
            placeholder={t('Confirm Password')}
            autoComplete='off'
            minLength='6'
            labelClassName='input-form-label my-3'
            className='rounded'
          />
          <Input
            as='select'
            size='sm'
            id='country'
            label={t('Country')}
            onChange={onChange}
            value={country}
            name='country'
            autoComplete='off'
            labelClassName='input-form-label my-3'
            className='rounded'
          >
            <>
              {countries.map(country => {
                return (
                  <option disabled={country.code === 'ZERO'} key={country.code}>
                    {country.name}
                  </option>
                )
              })}
            </>
          </Input>
          <Input
            label={t('Phone')}
            id='register-phone'
            type='text'
            value={phone}
            name='phone'
            onChange={onChange}
            placeholder={t('Phone')}
            autoComplete='off'
            labelClassName='input-form-label my-3'
            className='rounded'
          />
          <Checkbox
            id='subscribe-newsletters'
            label={t('Subscribe to newsletters')}
            checked={newsletters}
            name='newsletters'
            onChange={onChange}
            className='input-form-label my-4'
          />
          <hr className='my-3' />
          <Button
            variant='info'
            text={t('Register')}
            onClick={onSubmit}
            color='white'
            type='submit'
            className='button-custom float-right'
            id='user-register-button'
            disabled={disabled}
          />
        </Form>
        <p className='my-1'>
          {t('Already have an account?')}{' '}
          <Link to='/login'>{t('Sign In')}</Link>
        </p>
      </Container>
    </>
  )
}

export default Register
