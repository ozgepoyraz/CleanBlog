const Post = require('../models/Post')

exports.getAbout = async (req, res) => {
  res.render('about')
}

exports.getAddPost = async (req, res) => {
  res.render('add_post')
}

exports.getEdit = async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('edit', {
    post,
  })
}
