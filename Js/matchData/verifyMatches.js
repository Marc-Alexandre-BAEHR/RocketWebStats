let result = '';

function verifyMatches(matches) {
    const verifiedMatches = [];

    for (const game of matches) {

        // console.log(result);



        let filename = "";
        if (game.filename)
            filename = game.filename
        else
            filename = "No filename found"

        
        result = `File ERR : ${game}`;


        if (!game) 
            continue;
        if (!game.timestamp)
            continue;
        if (!game.teams)
            continue;

        result = `File  OK : ${game.timestamp[0]}`;
        verifiedMatches.push(game);
    }
    return verifiedMatches;
}

module.exports = {
    verifyMatches
};