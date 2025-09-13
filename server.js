///// IMPORTATION DES MODULES

// node_modules
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

// fichiers crées
const { generateJSON } = require("./Js/getMatchData.js");
const PORT = 5500;



// Utilisation des fichiers .ejs, stocker dans le dossier views/
// et le dossier public/ pour les fichiers FrontEnd (CSS, Images, ...)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));



// Fonction utilisée lors de la visite sur la page de Root du serveur
app.get("/", async (req, res) => {
    try {
        // récupérer le tableau creer dans Js/getMatchData.js, pour l'envoyer dans le fichier index.jes (page principale du site)
        const matches = await generateJSON();
        res.render("index", { matches: matches.reverse() });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});



// Pour lancer sur le port
app.listen(PORT, () => {
    console.log(`Ok Garmin, ouvre le serveur`);
    console.log(`http://localhost:${PORT}`);
});
