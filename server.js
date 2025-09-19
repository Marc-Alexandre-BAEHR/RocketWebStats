///// IMPORTATION DES MODULES

// node_modules
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

// fichiers crées
const { generateJSON }              = require("./Js/getMatchData.js");
const { getPlayerDataByNickname }   = require("./Js/getPlayerData.js");
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
        const PlayerDatas = {nickname: process.env.NICKNAME};
        res.render("index", {
            PlayerDatas: PlayerDatas
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

        // Permet d'utiliser temporairement le nickname dans les fichiers .ejs
        const PlayerDatas = {nickname: process.env.NICKNAME};
        res.render("history", { 
            matches: matches.reverse(), 
            PlayerDatas: PlayerDatas 
        });
    } catch (err) {
        res.render("errorpage", { err: err.message, title: 'Erreur BackEnd' });
    }
})

// Route pour afficher les données d'un joueur
app.get("/player", async (req, res) => {
    try {
        // Permet d'utiliser temporairement le nickname dans les fichiers .ejs
        const PlayerDatas = {nickname: process.env.NICKNAME};

        // Permet de formatter les données récupérer dans le .json précedemment pour
        // pouvoir les afficher en fonction du joueur
        const PlayerStats = getPlayerDataByNickname(PlayerDatas.nickname);

        res.render("player.ejs", {
            PlayerDatas: PlayerDatas,
            PlayerStats: PlayerStats
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
    console.log(`Ok Garmin, ouvre le serveur`);
    console.log(`http://localhost:${PORT}`);
});
