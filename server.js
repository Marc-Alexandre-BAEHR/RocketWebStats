///// IMPORTATION DES MODULES

// node_modules
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

// fichiers crées
const { generateJSON }    = require("./Js/getMatchData.js");
const { getPlayerData }   = require("./Js/getPlayerData.js");
const PORT = 5500;


// Utilisation des fichiers .ejs, stocker dans le dossier views/
// et le dossier public/ pour les fichiers FrontEnd (CSS, Images, ...)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));



// - Fonction utilisée lors de la visite sur les pages du serveur
// Page d'accueil
app.get("/", async (req, res) => {
    try {
        // Permet d'utiliser temporairement le nickname dans les fichiers .ejs
        res.render("index", {
            nickname: process.env.NICKNAME 
        });
    } catch(err) {
        res.render("errorpage", { err: err.message, title: 'Erreur BackEnd' });
    }
});

// Route pour afficher les parties jouées des fichiers récupérés
app.get("/history", async (req, res) => {
    try {
        // récupérer le tableau creer dans Js/getMatchData.js,
        // pour l'envoyer dans le fichier index.jes (page principale du site)
        const matches = await generateJSON();

        res.render("history", { 
            matches: matches, 
            nickname: process.env.NICKNAME 
        });
    } catch (err) {
        res.render("errorpage", { err: err.message, title: 'Erreur BackEnd' });
    }
})

// Route pour afficher les données d'un joueur
app.get("/player", async (req, res) => {
    try {
        // Permet d'utiliser temporairement le nickname dans les fichiers .ejs
        const matches = await generateJSON();

        // Permet de formatter les données récupérer dans le .json précedemment pour
        // pouvoir les afficher en fonction du joueur
        const PlayerDatas = getPlayerData(process.env.NICKNAME, matches);

        res.render("player.ejs", {
            PlayerDatas: PlayerDatas,
            nickname: process.env.NICKNAME 
        });
    } catch (err) {
        res.render("errorpage", { err: err.message, title: 'Erreur BackEnd' });
    }
})



// Middleware utilisé pour récupérer les erreurs frontend uniquement
app.use((err, req, res, next) => {
    console.error("Erreur captée :", err.stack);
    res.status(500).render("errorpage", {
        title: "Erreur FrontEnd",
        message: err,
        stack: err.stack
    });
});



// Pour lancer sur le port
app.listen(PORT, () => {
    console.log(`-=-=-=-=-=- OUVERTURE -=-=- ${PORT} -=-=-=-=-=-`);
});
