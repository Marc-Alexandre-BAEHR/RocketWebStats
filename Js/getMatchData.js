// Importation des modules
const fs = require("fs");
const path = require("path");
const folderPath = process.env.SAVEDFILEPATH || 'SavedFilesPasted'; // Chemin par défaut
const jsonPathMatch = path.join(__dirname, "matches.json");

// Importation des fichiers :
const { getMatchDuration }      = require("./matchData/getMatchDuration.js");
const { getWinner, getLoser }   = require("./matchData/getWinnerLoser.js");
const { getTeamsData }          = require("./matchData/getTeamsData.js")
const { getMVP }                = require("./matchData/getMVP.js");
const { convertTimestampDate }  = require("./matchData/convertTimestamp.js");
const { convertPlatform }       = require("./matchData/convertPlatform.js");
const { parseCSV }              = require("./matchData/parseCSV.js");


let AccountID = process.env.ACCOUNT_ID.split(',');
let AccountIDList = [];
for (element of AccountID) {
    AccountIDList.push(element);
}

function getPlayerID(data, AccountIDList)
{
    for (const player of data) {
        for (id of AccountIDList) {
            // console.log(`Compare: ${player.AccountId} - ${id}`);
            if (player.AccountId === id)
                return id;
        }
    }
    return undefined;
}


// Fonction pour générer le .json et envoyé les données au serveur, pour ensuite les rendre sur le site
async function generateJSON() {

    // Psedonyme du joueur à suivre
    // const nickname = process.env.NICKNAME;

    // renvoie tout les fichiers finissant en .csv figurant dans le dossier
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".csv"));
    
    // tableau qui stockera les dictionnaires de chaque matchs avec leurs statistiques
    let matches = [ new Date() ];
    // if (fs.existsSync(jsonPathMatch)) {
    //     matches = JSON.parse(fs.readFileSync(jsonPathMatch, "utf8"));
    // }

    // définit l'ID à 1 car on compte le nombre de match joué, excludant donc le 0
    let id = 1;

    // parcours chaque fichiers pour récuperer les informations du match
    // (score, buts inscris, victoire ou défaite, )
    for (const file of files) {
        try {
            
            // regarde d'abord si le fichier est déjà présent dans le .json
            // évite de devoir regarder tout les fichiers
            
            // if (matches.some(m => m.filename === file)) continue;
            // console.log(`-=-=- Scanning GAME ${id} -=-=-`);

            // récupération des données de chaque fichier, dans data
            const data = await parseCSV(path.join(folderPath, file));

            const PlayerAccountId = getPlayerID(data, AccountIDList);
            
            // console.log(`AccountID ${PlayerAccountId} for ${id}`);
    
            // récupération des données des 2 teams (cumul des scores des joueurs de chaque team)
            const teamsData = getTeamsData(data);
    
            // récupère la team du joueur, et détermine grace à l'équipe si le joueur a gagné ou non
            const playerTeam = data.find(p => p.AccountId === PlayerAccountId)?.TeamName;
            

            let matchResult = "";
            if (data.find(p => p.AccountId === PlayerAccountId))    
                matchResult = (playerTeam && playerTeam === getWinner(teamsData)) ? "Win" : "Lose";
            else
                matchResult = 'N/A'; 
    
            // renvoie un dictionnaire de toute les données récupérés jusqu'a présent
            // pour pouvoir les utiliser dans le .ejs
            const match = {
                id: id,
                filename: file,
                timestamp: convertTimestampDate(data[0].Timestamp),
                teams: [...new Set(data.map(d => d.TeamName))],
                teamsData,
                platform: convertPlatform(data),
                winner: getWinner(teamsData),
                loser: getLoser(teamsData),
                matchResult: matchResult,
                duration: getMatchDuration(data),
                mvp: getMVP(data),
                players: data
            };
    
            // augmente l'ID de 1 pour le prochain match, et ajoute le dictiononaire au tableau initialisé
            id++;
            matches.push(match);
        } catch (err) {
            console.log(`-=-=- ${file} -=-=-`);
            // console.log(`File: ${file}`);
            console.log(err);
            console.log('');
        }
    }


    // écriture du tableau dans le fichier JSON
    fs.writeFileSync(jsonPathMatch, JSON.stringify(matches, null, 2), "utf8");

    // renvoie du tableau pour povoir l'utiliser dans le BackEnd sans devoir relire le fichier
    return matches;
}



// Export de la fonction
module.exports = { generateJSON };
