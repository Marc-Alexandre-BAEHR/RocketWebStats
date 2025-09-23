const { getMVP } = require("./matchData/getMVP");



function games_status(game, nickname) {
    for (const player of game.players) {
        if (player.PlayerName === nickname) {
            if (player.TeamName === game.winner)
                return true;
            else
                return false;
        }
    }
    return false;
}

function game_nickname_played(game, nickname) {
    for (const player of game.players) {
        if (player.PlayerName === nickname) {
            console.log(player.PlayerName, 'Found');
            return true;
        }
    }
    console.log('didnt found player for ', game.id);
    return false;
}

function getInformations(info, game, nickname) {
    for (const player of game.players) {
        if (player.PlayerName === nickname)
            return parseInt(player.info);
    }
    return 0;
}

function getAverage(total, games, pre) {
    return `${((total/games)).toFixed(pre)}`
}


function getPlayerData(nickname, matches) {

    // Déclaration de toute les variables nécessaires    

    // - 1. Parties
    let games_played = 0;
    let games_won = 0;
    let games_winrate = 0;
    let games_mvp = 0;
    let games_mvprate = 0;
    
    // - 2. Scores
    let avg_score = 0;
    let total_score = 0;
    
    // - 3. Buts
    let avg_goals = 0;
    let total_goals = 0;
    
    // - 3.5 Ratio Tirs/Buts
    let goal_ratio = 0;

    // - 4. Tirs
    let avg_shots = 0;
    let total_shots = 0;
    
    // - 5. Passes décisives
    let avg_assists = 0;
    let total_assits = 0;

    // - 6. Arrêts
    let avg_saves = 0;
    let total_saves = 0;

    // - 7. démolitions
    let avg_demos = 0;
    let total_demos = 0;
    
    
    
    // Récupération de toute les statistiques
    for (const game of matches) {


        // 0. Si le joueur n'est pas dans la partie, alors on continue
        if (!game_nickname_played(game, nickname))
            continue;

        // console.log('GameFile: ', game.filename);


        // 1. Parties
        games_played++;

        // Partie gagné ou perdu ?
        if (games_status(game, nickname)) {
            // Si le joueur a terminé MVP
            if (game.mvp.PlayerName === nickname)
                games_mvp++;
            games_won++;
        }

        // 2. Ajout des statistiques
        
        for (const player of game.players) {
            if (player.PlayerName === nickname) {
                total_score += parseInt(player.Score);
                total_goals += parseInt(player.Goals);
                total_assits+= parseInt(player.Assists);
                total_saves += parseInt(player.Saves);
                total_shots += parseInt(player.Shots);
                total_demos += parseInt(player.Demolishes);
            }
        }
        
        
        
    }

    // Calcul des statistiques finales (moyennes, ...)
    
    // 1. Parties
    games_winrate = `${((games_won*100)/games_played).toFixed(2)}%`; 
    games_mvprate = `${((games_mvp*100)/games_won).toFixed(2)}%`; 
    
    // 2. Moyennes
    avg_score = getAverage(total_score, games_played, 2);
    avg_goals = getAverage(total_goals, games_played, 2);
    avg_shots = getAverage(total_shots, games_played, 2);
    avg_assists = getAverage(total_assits, games_played, 2);
    avg_saves = getAverage(total_saves, games_played, 2);
    avg_demos = getAverage(total_demos, games_played, 2);
    
    // 3. Goal ratio
    goal_ratio = getAverage(total_shots, total_goals, 2); 


    // Logs

    
    console.log('-=-=- STATS -=-=-');
    console.log(`Games : Played=${games_played}, Win=${games_won}, Rate=${games_winrate}, MVP=${games_mvp},  MVP%=${games_mvprate}`);
    console.log(`Scores : ${total_score}    [${avg_score}]`);
    console.log(`Goals  : ${total_goals}    [${avg_goals}] - Goal Ratio : ${goal_ratio}`);
    console.log(`Shots  : ${total_shots}    [${avg_shots}]`);
    console.log(`Assists: ${total_assits}   [${avg_assists}]`);
    console.log(`Saves  : ${total_saves}    [${avg_saves}]`);
    console.log(`Demos  : ${total_demos}    [${avg_demos}]`);
    console.log('-=-=-=-=-=-=-=-=-');
    

    const PlayerDatas = {
        nickname: nickname,
        games_played: games_played,
        winrate: games_winrate,
        mvprate: games_mvprate

    }
    
    // console.log(PlayerDatas);
    return PlayerDatas;
}



module.exports = {
    getPlayerData
};