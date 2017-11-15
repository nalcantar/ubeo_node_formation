const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const PORT = 3000;

let frenchMovies = [];

app.use( '/public', express.static('public') );
//app.use( bodyParser.urlencoded( { extended: false } ) );

//EJS
app.set( 'views', './views' );
app.set( 'view engine', 'ejs' );

app.get( "/movies", (req, res) => {

    const title = "Films de plusieurs années";

    frenchMovies = [
        { title : "Le fabuleux destin d'Amélie Poulin", year : 2001 },
        { title : "Thor", year : 2015 },
        { title : "Bon cop bad cop", year : 1999 },
        { title : "les aventures de Richie", year : 1923 }
    ];
    res.render('movies', { movies : frenchMovies, title : title } );
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*app.post( '/movies', urlencodedParser, (req, res) => {
    console.log( req.body.movietitle );
    const newMovie = { title : req.body.movietitle, year : req.body.movieyear };
    frenchMovies = [ ...frenchMovies, newMovie ];
    console.log( frenchMovies );
    res.sendStatus(201);
});*/

app.post('/movies', upload.fields([])  , (req, res) => {
    if ( !req.body ) {
        return res.sendStatus( 500 );
    } else {
        const formData = req.body;
        console.log( 'formData : ', formData );
        const newMovie = { title : req.body.movietitle, year : req.body.movieyear };
        frenchMovies = [ ...frenchMovies, newMovie ];
        res.sendStatus(201);
    }
});

app.get( "/movie-details", (req, res) => {
    //res.send("Bientôt de films ici");
    res.render('movies-details' );
});

app.get( '/movies/add', (req, res) => {
   res.send("Prochainement un formulaire ici");
});

app.get( '/movies/:id', (req, res) => {
   const id = req.params.id;
   res.render( 'movies-details', { movieid: id } );
});

app.get( '/', (req, res) => {
   //res.send("Hello <b>WORLD</b>!!");
    res.render( 'index' );
});

app.listen( PORT, () => {
   console.log( `Listening on port ${PORT}` );
});