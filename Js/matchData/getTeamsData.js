// Fonction pour récuperer les scores par teams
function getTeamsData(players) {
    const teams = {};
    players.forEach(p => {
        if (!teams[p.TeamName]) {
            teams[p.TeamName] = { goals: 0, shots: 0, score: 0, assists: 0, saves: 0 };
        }
        if (p.Goals)
            teams[p.TeamName].goals += parseInt(p.Goals);
        if (p.Shots)
            teams[p.TeamName].shots += parseInt(p.Shots);
        if (p.Score)
            teams[p.TeamName].score += parseInt(p.Score);
        if (p.Assists)
            teams[p.TeamName].assists += parseInt(p.Assists);
        if (p.Saves)
            teams[p.TeamName].saves += parseInt(p.Saves);
    });
    return teams;
}



// Export de la fonction
module.exports = {
    getTeamsData
};