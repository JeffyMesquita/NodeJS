var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var app = express();

app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extend: true,
}))

app.set('views', './views');
app.set('view engine', 'jade');

app.route('/')
   .get((req, res) => {
      listarCursos(res);
   })
   .post(() => {
      var curso = {nome: req.body.nome, categoria: req.body.categoria};

      InserirCurso(curso, () => {
         listarCursos(res);
      })
   })

app.get('/', (req, res) => {
   res.render('index', {nome: 'TreinaWeb'});
});



app.listen(3000, () => {
   console.log('App rodando na porta 3000');
});


function listarCursos(resp) {
   MongoClient.connect('mongodb://localhost:27017/treinaweb',{ useUnifiedTopology: true }, (err, db) => {
      db.collection('cursos').find().sort({nome: 1}).toArray((err, result) => {
         resp.render('index', {data: result});
      })
   })
}

function InserirCurso(obj, callback) {
   MongoClient.connect('mongodb://localhost:27017/treinaweb', (err, db) => {
      db.collection('cursos').insertOne(obj, (err, result) => {
         callback();
      })
   })
}