const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postController = require('./controllers/postController')
const pageController = require('./controllers/pageController')

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', postController.getAllPosts)
app.get('/about', pageController.getAbout)
app.get('/add_post', pageController.getAddPost)
app.get('/posts/edit/:id', pageController.getEdit)
app.get('/posts/:id', postController.getPost)
app.post('/posts', postController.createPost)
app.put('/posts/:id', postController.updatePost)
app.get('/posts/del/:id', postController.deletePost)

app.listen(3000, () => {
  console.log('3000 portu dinleniyor.')
})
