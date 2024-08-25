/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import UserService from '../services/user.service'

const router = express.Router()

router.get('/', async (_req, res) => {
  const usersList = await UserService.getUsers()
  res.send(usersList)
})

export default router
