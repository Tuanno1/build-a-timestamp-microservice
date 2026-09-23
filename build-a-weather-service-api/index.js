import express from 'express'
import path from 'path' // THÊM
import { fileURLToPath } from 'url' // THÊM

import weatherRouter from './weather.js'

const app = express()

const PORT = 3000

// THÊM: tạo __filename và __dirname trong ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// THÊM: phục vụ các file trong thư mục public
// ĐẶT TRƯỚC TẤT CẢ ROUTE
app.use(express.static(path.join(__dirname, 'public')))

// THAY ĐỔI: gửi file HTML thay vì plain text
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// THAY ĐỔI: bổ sung version và danh sách endpoints
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Weather Service API',
    version: '1.0.0',
    endpoints: [
      '/api/weather/:city',
      '/api/greet/:name',
      '/api/data',
    ],
  })
})

app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'OK',
  })
})

app.get('/docs', (req, res) => {
  res.redirect('/api/info')
})

app.get('/api/greet/:name', (req, res) => {
  const name = req.params.name

  res.json({
    message: `Hello, ${name}!`,
  })
})

app.route('/api/data')
  .get((req, res) => {
    res.json({
      message: 'Data retrieved successfully',
    })
  })
  .post((req, res) => {
    res.status(201).json({
      message: 'Data created successfully',
    })
  })

app.use('/api/weather', weatherRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})