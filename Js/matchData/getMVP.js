// Fonction pour récupérer le meilleur joueur (MVP: Most Valuable Player)
function getMVP(players) {
    return players.reduce((best, p) => (!best || parseInt(p.Score) > parseInt(best.Score)) ? p : best, null);
}



// Export de la fonction
module.exports = {
    getMVP
};