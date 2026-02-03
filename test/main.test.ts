import axios from 'axios'
test('Deve criar uma conta', async () => {
  const input = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    document: '87222288892',
    password: '1234',
  }

  const responseSignup = await axios.post('http://localhost:3000/signup', input)
  const outputSignup = responseSignup.data

  expect(outputSignup.accountId).toBeDefined()
  const responseGetAccount = await axios.get(
    `http://localhost:3000/accounts/${outputSignup.accountId}`
  )
  const outputGetAccount = responseGetAccount.data
  expect(outputGetAccount.name).toBe(input.name)
  expect(outputGetAccount.email).toBe(input.email)
  expect(outputGetAccount.document).toBe(input.document)
  expect(outputGetAccount.password).toBe(input.password)
})
