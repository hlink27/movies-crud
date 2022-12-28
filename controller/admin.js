const path = require("path")

const Movie = require('../models/movie')

exports.getMovies = (req, res, next) => {
    Movie.fetchAll(movies => {
        res.render('index', {
            movies: movies,
            pageTitle: 'Movies',
            path: '/'
        })
    })
}

exports.getAddMovie = (req, res, next) => {
    res.render('edit-movie', {
        pageTitle: 'Add Movie',
        path: '/add-movie',
        editing: false
    })
}

exports.postAddMovie = (req, res, next) => {
    const title = req.body.title
    const posterUrl = req.body.posterUrl
    const grade = req.body.grade
    const synopsis = req.body.synopsis
    const year = req.body.year
    const movie = new Movie(null, title, 
        posterUrl, grade, year, synopsis,)
    movie.save() 
    res.redirect('/')
}

exports.getMovie = (req, res, next) => {
    const movId = req.params.movieId
    Movie.findById(movId, movie => {
        res.render('movie-detail', {
            movie: movie,
            pageTitle: movie.title,
            path: '/movie-detail'
        })
    })
}

exports.getEditMovie = (req, res, next) => {
    const editMode = req.query.edit
    if(!editMode){
        return res.redirect('/')
    }
    const movId = req.params.movieId
    Movie.findById(movId, movie => {
        if(!movie) {
            return res.redirect('/')
        }
        res.render('edit-movie', {
            pageTitle: 'Edit Movie',
            path: '/edit-movie',
            editing: editMode,
            movie: movie
        })
    })
}

exports.postEditMovie = (req, res, next) => {
    const movId = req.body.movieId
    const updTitle = req.body.title
    const updPosterUrl = req.body.posterUrl
    const updSynopsis = req.body.synopsis
    const updYear = req.body.year
    const updGrade = req.body.grade
    const updMovie = new Movie(
        movId, updTitle, updPosterUrl,
        updGrade, updYear, updSynopsis
    )
    updMovie.save()
    res.redirect('/')
}

exports.postDeleteMovie = (req, res, next) => {
    const movId = req.body.movieId
    Movie.deleteById(movId)
    res.redirect('/')
}