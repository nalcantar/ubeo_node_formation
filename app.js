const express = require('express');
const app = express();
const PORT = 3000;

app.use('/public', express.static('public'));

//EJS
app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/movies", (req, res) => {
   //res.send("Bientôt de films ici");
    res.render('movies');
});

app.get("/movie-details", (req, res) => {
    //res.send("Bientôt de films ici");
    res.render('movies-details');
});

app.get('/movies/add', (req, res) => {
   res.send("Prochainement un formulaire ici");
});

app.get('/movies/:id', (req, res) => {
   const id = req.params.id;
   res.send(`Film numéro ${id}`);
    res.render('movies-details');
});

app.get('/', (req, res) => {
   //res.send("Hello <b>WORLD</b>!!");
    res.render('index');
});

app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
});