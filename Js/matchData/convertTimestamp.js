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
        "janvier",      // 01
        "février",      // 02
        "mars",         // 03
        "avril",        // 04
        "mai",          // 05
        "juin",         // 06
        "juillet",      // 07
        "août",         // 08
        "septembre",    // 09
        "octobre",      // 10
        "novembre",     // 11
        "décembre"      // 12
    ];
    const final_string = `${day} ${mois[month - 1]} ${year} - ${hour}h${minute.toString().padStart(2, "0")}.${second.toString().padStart(2, "0")}`;
    return final_string;
}



// Export de la fonction
module.exports = {
    convertTimestampDate
};