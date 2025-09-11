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



// Export de la fonction
module.exports = {
    getTeamsData
};