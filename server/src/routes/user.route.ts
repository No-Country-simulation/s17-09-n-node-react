import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('This is a list of users')
})

export default router
