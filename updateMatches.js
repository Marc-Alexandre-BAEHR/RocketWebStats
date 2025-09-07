const fs = require("fs");
const path = require("path");
const { parseCSV } = require("./utils/parseCSV.js");
const folderPath = process.env.SAVEDFILEPATH;
const jsonPath = path.join(__dirname, "matches.json");

// Fonction pour convertir le timestamp récupéré en vrai date visible sur le site
function convertTimestampDate(timestamp) {
    if (!timestamp)
        return "";
    const [datePart, timePart] = timestamp.split("_");
    if (!datePart || !timePart)
        return timestamp;
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split("-").map(Number);
    const mois = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];
    const final_string = `${day} ${mois[month - 1]} ${year} - ${hour}h${minute.toString().padStart(2, "0")}.${second.toString().padStart(2, "0")}`;
    return final_string;
}

// Fonction pour transformer le temps (string) en nombre
function parseTimeToSeconds(timeStr) {
    if (!timeStr)
        return 0;
    const parts = timeStr.split(":").map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}

// Fonction pour récuperer le temps de la partie (basé faussement sur la possession, seul data disponible)
function getMatchDuration(players) {
    let totalSec = 0;
    players.forEach(p => {
        totalSec += parseTimeToSeconds(p.PossessionTime);
    });
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${minutes}m${seconds.toString().padStart(2, "0")}s`;
}

// Fonction pour récuperer les scores par teams
function getTeamsData(players) {
    const teams = {};
    players.forEach(p => {
        if (!teams[p.TeamName]) {
            teams[p.TeamName] = { goals: 0, shots: 0, score: 0, assists: 0, saves: 0 };
        }
        teams[p.TeamName].goals += parseInt(p.Goals);
        teams[p.TeamName].shots += parseInt(p.Shots);
        teams[p.TeamName].score += parseInt(p.Score);
        teams[p.TeamName].assists += parseInt(p.Assists);
        teams[p.TeamName].saves += parseInt(p.Saves);
    });
    return teams;
}

// Fonction pour récuperer le nom de la team qui a gagné
function getWinner(teamsData) {
    const teamNames = Object.keys(teamsData);
    if (teamsData[teamNames[0]].goals > teamsData[teamNames[1]].goals)
        return teamNames[0];
    if (teamsData[teamNames[0]].goals < teamsData[teamNames[1]].goals)
        return teamNames[1];
    return null;
}

// Fonction pour récupérer le meilleur joueur (MVP: Most Valuable Player)
function getMVP(players) {
    return players.reduce((best, p) => (!best || parseInt(p.Score) > parseInt(best.Score)) ? p : best, null);
}

// Fonction pour générer le .json et envoyé les données au serveur, pour ensuite les rendre sur le site
async function generateJSON() {
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".csv"));
    let matches = [];
    for (const file of files) {
        const data = await parseCSV(path.join(folderPath, file));
        const teamsData = getTeamsData(data);
        const match = {
            filename: file,
            timestamp: convertTimestampDate(data[0].Timestamp),
            teams: [...new Set(data.map(d => d.TeamName))],
            teamsData,
            winner: getWinner(teamsData),
            duration: getMatchDuration(data),
            mvp: getMVP(data),
            players: data
        };
        matches.push(match);
    }
    fs.writeFileSync(jsonPath, JSON.stringify(matches, null, 2), "utf8");
}

// Exporter la fonction (la rendre disponible au serveur)
module.exports = { generateJSON };
