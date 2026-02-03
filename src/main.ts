import express, { Response, Request } from 'express'
import crypto from 'crypto'
const app = express()

app.post('/signup', async (req: Request, res: Response) => {
  console.log('/signup')
  const accountId = crypto.randomUUID()
  res.json({
    accountId,
  })
})

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
  const accountId = req.params.accountId
  console.log(`/accounts/${accountId}`)

  res.json({
    accountId,
  })
})

app.listen(3000)
