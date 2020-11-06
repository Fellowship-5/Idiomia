const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const { findEntryById } = require('../services/user_methods')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    res.status(422).json(errors)
    return next(errors)
  }
  const { name, email, password, country, phone, newsletters } = req.body

  let userExists
  try {
    userExists = await User.findOne({ email })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Could not save user in database'
    })
    return next(error)
  }
  if (userExists) {
    res.status(422).json({
      msg: 'You are already signed up'
    })
    return next(new Error('You are already signed up'))
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (error) {
    res.status(500).json({
      msg: 'Could not save user'
    })
    return next(error)
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    country,
    phone,
    newsletters
  })

  try {
    await newUser.save()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Could not save user in database'
    })
    return next(error)
  }

  let token
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'sign up failed. Please try again later'
    })
    return next(error)
  }

  res.status(201).json({
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
    token
  })
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Could not find user in database'
    })
    return next(error)
  }

  if (!existingUser) {
    res.status(422).json({
      msg: 'User is not found.'
    })
    return next(new Error('Invalid credentials.'))
  }

  let validPassword = false
  try {
    validPassword = await bcrypt.compare(password, existingUser.password)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'login failed. Please try again later'
    })
    return next(error)
  }

  if (!validPassword) {
    res.status(422).json({
      msg: 'Invalid credentials.'
    })
    throw new Error('Invalid credentials.')
  }

  let token
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      {
        expiresIn: '1h'
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'sign up failed. Please try again later'
    })
    return next(error)
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    role: existingUser.role,
    token: token
  })
}

const getUserInfo = async (req, res, next) => {
  let user
  try {
    user = await await User.findById(req.userData.userId)
      .select('-password')
      .populate('proverbs')
  } catch (error) {
    return next(error)
  }

  if (!user) {
    res.status.json({ msg: 'could not find the user' })
    throw new Error('Could not find user.')
  }
  res.json({
    current_user: user.toObject({ getters: true })
  })
}

exports.getUserInfo = getUserInfo
exports.signup = signup
exports.login = login
