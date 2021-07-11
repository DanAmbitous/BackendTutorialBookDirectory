const express = require('express')
const router = express.Router()

//All author route
router.get('/', (req, res) => {
  res.render('author/authorIndex')
})

//New author route
router.get('/new', (req, res) => {
  res.render('author/authorNew')
})

router.post('/', (req, res) => {
  res.send('Create the author')
})

module.exports = router