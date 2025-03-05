const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('tp_database', 'TP', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const Login = sequelize.define('Logins', {
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Camion = sequelize.define('Camions', {
    type: { type: DataTypes.STRING, allowNull: false },
    localisation: { type: DataTypes.STRING, allowNull: false }
});

const Chauffeur = sequelize.define('Chauffeurs', {
    nom: { type: DataTypes.STRING, allowNull: false },
    camionId: { type: DataTypes.INTEGER, allowNull: false }
});

const Livraison = sequelize.define('Livraisons', {
    ville: { type: DataTypes.STRING, allowNull: false },
    camionId: { type: DataTypes.INTEGER, allowNull: false }
});

// Vérification login/password
app.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const user = await Login.findOne({ where: { login } });
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ success: true, message: 'Connexion réussie' });
    } else {
        res.status(401).json({ success: false, message: 'Identifiants incorrects' });
    }
});

// Obtenir camions pour une ville donnée
app.get('/camions/:ville', async (req, res) => {
    const { ville } = req.params;
    const camions = await Livraison.findAll({ where: { ville }, include: [Camion] });
    res.json(camions);
});

// Insertion d'un camion
app.post('/camions', async (req, res) => {
    const camion = await Camion.create(req.body);
    res.json(camion);
});

// Modifier/Supprimer un chauffeur
app.put('/chauffeurs/:id', async (req, res) => {
    await Chauffeur.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Chauffeur mis à jour' });
});

app.delete('/chauffeurs/:id', async (req, res) => {
    await Chauffeur.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Chauffeur supprimé' });
});

// Localisation des camions d'un type donné à une date donnée
app.get('/localisation', async (req, res) => {
    const { type, date } = req.query;
    const camions = await Camion.findAll({ where: { type } });
    res.json(camions);
});

// Démarrer le serveur
sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Serveur lancé sur http://localhost:5000'));
});
