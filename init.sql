CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

CREATE TABLE Type(
   Id_Type INT AUTO_INCREMENT PRIMARY KEY,
   nom_type VARCHAR(50) NOT NULL
);

CREATE TABLE Chauffeur(
   Id_Chauffeur INT AUTO_INCREMENT PRIMARY KEY,
   numero_permis VARCHAR(16) NOT NULL,
   nom VARCHAR(255),
   prenom VARCHAR(255)
);

CREATE TABLE Localisation(
   Id_Localisation INT AUTO_INCREMENT PRIMARY KEY,
   date_localisation DATETIME NOT NULL,
   ville VARCHAR(50)
);

CREATE TABLE Camion(
   Id_Camion INT AUTO_INCREMENT PRIMARY KEY,
   immatriculation VARCHAR(7),
   poids_max INT NOT NULL,
   Id_Localisation INT NOT NULL,
   Id_Type INT NOT NULL,
   FOREIGN KEY(Id_Localisation) REFERENCES Localisation(Id_Localisation),
   FOREIGN KEY(Id_Type) REFERENCES Type(Id_Type)
);

CREATE TABLE Marchandise(
   Id_Marchandise INT AUTO_INCREMENT PRIMARY KEY,
   nom VARCHAR(255) NOT NULL,
   poids INT NOT NULL,
   date_transport DATE NOT NULL,
   ville_depart VARCHAR(255),
   ville_arrivee VARCHAR(255) NOT NULL,
   Id_Camion INT NOT NULL,
   Id_Type INT NOT NULL,
   FOREIGN KEY(Id_Camion) REFERENCES Camion(Id_Camion),
   FOREIGN KEY(Id_Type) REFERENCES Type(Id_Type)
);

CREATE TABLE Affectation(
   Id_Affectation INT AUTO_INCREMENT PRIMARY KEY,
   date_affectation DATE NOT NULL,
   Id_Chauffeur INT NOT NULL,
   Id_Camion INT NOT NULL,
   FOREIGN KEY(Id_Chauffeur) REFERENCES Chauffeur(Id_Chauffeur),
   FOREIGN KEY(Id_Camion) REFERENCES Camion(Id_Camion)
);
