// Fonction pour récuperer le nom de la team qui a gagné
function getWinner(teamsData) {
    const teamNames = Object.keys(teamsData);
    if (teamsData[teamNames[0]].goals > teamsData[teamNames[1]].goals)
        return teamNames[0];
    if (teamsData[teamNames[0]].goals < teamsData[teamNames[1]].goals)
        return teamNames[1];
    return null;
}



// Fonction pour récuperer le nom de la team qui a perdu
function getLoser(teamsData) {
    const teamNames = Object.keys(teamsData);
    if (teamsData[teamNames[0]].goals > teamsData[teamNames[1]].goals)
        return teamNames[1];
    if (teamsData[teamNames[0]].goals < teamsData[teamNames[1]].goals)
        return teamNames[0];
    return null;
}



// Export de la fonction
module.exports = {
    getWinner,
    getLoser
};