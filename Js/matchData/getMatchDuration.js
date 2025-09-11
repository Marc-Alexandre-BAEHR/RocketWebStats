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



// Export de la fonction
module.exports = {
    getMatchDuration
};