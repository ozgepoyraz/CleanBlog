const Post = require('../models/Post')
const fs = require('fs')

exports.getAllPosts = async (req, res) => {
  console.log(req.query.page)
  const page = req.query.page || 1
  const postPerPage = 3
  const totalPost = await Post.find({}).countDocuments()
  const posts = await Post.find({})
    .sort('-dateCreated')
    .skip((page - 1) * postPerPage)
    .limit(postPerPage)
  res.render('index', {
    posts: posts,
    current: page,
    pages: Math.ceil(totalPost / postPerPage),
  })
}

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('post', {
    post,
  })
}

exports.createPost = async (req, res) => {
  await Post.create(req.body)
  res.redirect('/')
}

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id)
  post.title = req.body.title
  post.detail = req.body.detail
  await post.save()
  res.redirect(`/posts/${req.params.id}`)
}

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect('/')
}
