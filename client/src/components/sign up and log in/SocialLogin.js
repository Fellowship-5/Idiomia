import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import Button from '../Button'
import { toast } from 'react-toastify'

export default function SocialLogin (props) {
  return (
    <div className='socialLoginButtons'>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_KEY}
        callback={props.handleFacebookSignUp}
        fields='name,email,id'
        render={renderProps => (
          <Button
            icon='fa-facebook'
            variant='outline-dark'
            text={props.facebookBtnTxt}
            onClick={renderProps.onClick}
          />
        )}
      />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={renderProps => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant='outline-dark'
            text={props.googleBtnTxt}
          />
        )}
        onSuccess={props.handleGoogleSignUp}
        onFailure={error => toast.error(error)}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}
