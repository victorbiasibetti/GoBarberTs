import express from 'express'

const app = express();

app.get('/', (request, response) => {
  return response.json({message: 'hello world'})
})
app.listen(3334, () => {
  console.log('server run')
})