const express = require('express')
const { check } = require('express-validator')
const checkAuth = require('../middleware/checkAuth')
const proverbsController = require('../controllers/proverbs-controllers')
const { paginateResponse } = require('../services/paginateResponse')
const Proverb = require('../models/proverb')

const router = express.Router()

router.get(
  '/all-proverbs',
  paginateResponse(Proverb),
  proverbsController.getProverbs
)
router.get('/get-proverb/:pid', proverbsController.getProverbById)
router.get('/proverb-search', proverbsController.searchProverbs)

router.post(
  '/post-proverb',
  [
    (check('proverb')
      .not()
      .isEmpty(),
    check('translation')
      .not()
      .isEmpty(),
    check('explanation')
      .not()
      .isEmpty())
  ],
  proverbsController.postProverb
)

router.use(checkAuth)

router.get(
  '/my-proverbs',
  paginateResponse(Proverb),
  proverbsController.getProverbsByUserId
)
router.post(
  '/post-my-proverb',
  [
    (check('proverb')
      .not()
      .isEmpty(),
    check('translation')
      .not()
      .isEmpty(),
    check('explanation')
      .not()
      .isEmpty())
  ],
  proverbsController.postUserProverb
)
router.patch('/edit-my-proverb/:pid', proverbsController.editUserProverb)
router.delete('/delete-my-proverb/:pid', proverbsController.deleteUserProverb)

module.exports = router
