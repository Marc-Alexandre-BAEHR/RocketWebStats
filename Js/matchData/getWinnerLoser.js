// Fonction pour récuperer le nom de la team qui a gagné
function getWinner(teamsData) {
    try {
        const teamNames = Object.keys(teamsData);
        if (teamsData[teamNames[0]].goals > teamsData[teamNames[1]].goals)
            return teamNames[0];
        if (teamsData[teamNames[0]].goals < teamsData[teamNames[1]].goals)
            return teamNames[1];
    } catch(err) {
        console.log(`ERR: ID:${teamsData['id']} - getWinner()`);
    }
    return undefined;
}


// Fonction pour récuperer le nom de la team qui a perdu
function getLoser(teamsData) {
    try {
        const teamNames = Object.keys(teamsData);
        if (teamsData[teamNames[0]].goals > teamsData[teamNames[1]].goals)
            return teamNames[1];
        if (teamsData[teamNames[0]].goals < teamsData[teamNames[1]].goals)
            return teamNames[0];
    } catch(err) {
        console.log(`ERR: ID:${teamsData} - getLoser()`);
    }
    return undefined;

}



// Export de la fonction
module.exports = {
    getWinner,
    getLoser
};