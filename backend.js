const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Remplace par ton utilisateur MySQL
  password: "", // Mets ton mot de passe MySQL
  database: "transport_db", // Nom de ta base de données
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connexion à MySQL réussie");
  }
});

// Récupérer tous les camions
app.get("/camions", (req, res) => {
  db.query("SELECT * FROM Camion", (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// Ajouter un camion
app.post("/camions", (req, res) => {
  const { immatriculation, poids_max } = req.body;
  db.query(
    "INSERT INTO Camion (immatriculation, poids_max, Id_Localisation, Id_Type) VALUES (?, ?, 1, 1)",
    [immatriculation, poids_max],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json({ message: "Camion ajouté avec succès" });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Serveur backend démarré sur http://localhost:5000");
});
