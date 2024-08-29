import { Request, Response, NextFunction } from 'express'

export default function roleHandler() {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('jjj')
  }
}
