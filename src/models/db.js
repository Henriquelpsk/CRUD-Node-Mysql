const { Sequelize } = require('sequelize');

//Conexão com o banco de dados
const sequelize = new Sequelize('sistemaDeCadastro', 'root', '@Teste123', {
	host: 'localHost',
	dialect: 'mysql'
});

sequelize.authenticate()
.then(() => console.log('conectado ao banco de dados'))
.catch((e) => console.log(e));

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}