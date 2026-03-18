const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

let regiao = [
    { id: 1, nome: 'header', position: 'top' },
    { id: 2, nome: 'nav', position: 'top' },
    { id: 3, nome: 'main', position: 'middle' },
    { id: 4, nome: 'footer', position: 'bottom' },
]

app.get('/regiao', (req, res) => {
  res.json({
    success: true,
    data: regiao
  })
})

app.get('/regiao/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const foundRegiao = regiao.find(r => r.id === id)
  if (!foundRegiao) {
    return res.status(404).json({
      success: false,
      message: 'Região não encontrada'
    })
  }
  res.json({
    success: true,
    data: foundRegiao
  })
})

app.post('/regiao', (req, res) => {
  const { nome, position } = req.body
  if (!nome || !position) {
    return res.status(400).json({
      sucess: false,
        message: 'Nome e posição são obrigatórios'
    })
  }
  const newRegiao = { id: regiao.length + 1, nome, position }
  regiao.push(newRegiao)
  res.status(201).json({
    success: true,
    data: newRegiao,
    message: 'Região criada com sucesso'
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Express!')
})