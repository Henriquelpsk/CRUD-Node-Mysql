const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Post = require ('./src/models/Post');

//Config
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas

app.get('/', (req,res) => {
	Post.findAll({order: [['id', 'DESC']]})
	.then((posts) => 	res.render(__dirname + '/src/views/home', {lista: posts}));
})

app.get('/cad', (req,res) => {
	res.render(__dirname + '/src/views/form');
})

app.post('/cad', (req,res) => {
	Post.create({
		titulo: req.body.titulo,
		conteudo: req.body.conteudo
	})
	.then(() => res.redirect('/'))
	.catch((e) => 'Houve um erro: ' + e);

})

app.get('/deletar/:id', (req,res) => {
	Post.destroy({where: {'id': req.params.id}})
	.then(() => res.redirect('/'))
	.catch((e) => res.send(e));
})

app.get('/edit/:id', function(req, res){
  Post.findByPk(req.params.id)
    .then(post => {
      res.render(__dirname + '/src/views/formEdit', {post:post})
    })
    .catch(err => {
      res.send('Post não encontrado!')
    })
})
app.post('/edit/:id', function(req, res){
  Post.update({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  },
  {
    where: { id: req.params.id }
  }).then(function(){
    res.redirect('/')
  }).catch(function(err){
    console.log(err);
  })
})

app.listen(3000, () => {
	console.log('servidor aberto em:');
	console.log('http://localhost:3000');
});
