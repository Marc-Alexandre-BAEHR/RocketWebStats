require('dotenv').config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const { generateJSON } = require("./updateMatches.js");

const app = express();
const PORT = 3000; // SI VOUS SOUHAITEZ CHANGER LE PORT DU SERVEUR

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Lors du chargement du site :
app.get("/", async (req, res) => {
    try {
        await generateJSON();
        const jsonPath = path.join(__dirname, "matches.json");
        let matches = [];
        if (fs.existsSync(jsonPath)) {
            matches = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        }
        res.render("index", { matches: matches.reverse() });
    } catch (err) {
        console.error(err);
        res.status(500).send("Err500");
    }
});

// Pour lancer sur le port
app.listen(PORT, () => {
    console.log(`Ok Garmin, ouvre le serveur`);
    console.log(`http://localhost:${PORT}`);
});
