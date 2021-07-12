const express = require('express')
const router = express.Router()
const AuthorSchema = require('../models/authorModel')

//All author route
router.get('/', async (req, res) => {
  let searchOptions = {}

  if (req.query.name != null && req.query.name != '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await AuthorSchema.find(searchOptions)

    res.render('author/authorIndex', {
      authors: authors,
      searchOptions: req.query
    })

    console.log(authors)
  } catch (error) {
    res.redirect('/')
  }
})

//New author route
router.get('/newAuthor', (req, res) => {
  res.render('author/newAuthor', { author: new AuthorSchema() })
})

router.post('/', async (req, res) => {
  console.log(req.body)

  const author = new AuthorSchema({
    name: req.body.name
  })

  try {
    const newAuthor = await author.save()

    // res.redirect(`author/${newAuthor}`)
    res.redirect('/author')
  } catch (error) {
    res.render('author/newAuthor', {
      author: author,
      errorMessage: `Error creating author: ${error}`
    })
  }

  // author.save((error, newAuthor) => {
  //   if (error) {
  //     res.render('author/newAuthor', {
  //       author: author,
  //       errorMessage: `Error creating author ${error}`
  //     })
  //   } else {
  //     // res.redirect(`author/${newAuthor}`)

  //     res.redirect('/author')
  //   }
  // })
})

module.exports = router