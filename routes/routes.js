const path = require('path')
const express = require('express')
const adminController = require('../controller/admin')
const router = express.Router()

//Get movies
router.get('/', adminController.getMovies)

//Add movie
router.get('/add-movie', adminController.getAddMovie)
router.post('/add-movie', adminController.postAddMovie)

//Edit movie
router.get('/edit-movie/:movieId', adminController.getEditMovie)
router.post('/edit-movie', adminController.postEditMovie)

//Delete
router.post('/delete-movie', adminController.postDeleteMovie)

//Details
router.get('/movie-detail/:movieId', adminController.getMovie);

module.exports = router