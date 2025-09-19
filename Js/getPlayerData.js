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
        if (player.PlayerName === nickname)
            return true;
        else
            return false;
    }
    return false;
}

function getScore(game, nickname) {
    for (const player of game.players) {
        if (player.PlayerName === nickname)
            return parseInt(player.Score);
    }
    return 0;
}


function getPlayerData(nickname, matches) {

    // Déclaration de toute les variables nécessaires    

    // - 1. Scores
    let avg_score = 0;
    let total_score = 0;
    let highest_score = 0;
    
    // - 2. Parties
    let games_played = 0;
    let games_won = 0;
    let games_winrate = 0;
    let games_mvp = 0;
    let games_mvprate = 0;
    
    // - 3. Tirs, arrêts et buts
    let goals = 0;
    let shots = 0;
    let goal_ratio = 0;
    
    // - 4. Passes décisives et démolitions
    let assits = 0;
    let avg_assists = 0;
    let demos = 0;
    let avg_demos = 0;
    
    
    
    // Récupération de toute les statistiques
    for (const game of matches) {


        // 0. Si le joueur n'est pas dans la partie, alors on continue
        if (game_nickname_played(game, nickname))
            continue;

        // 1. Parties
        games_played++;

        // Partie gagné ou perdu ?
        if (games_status(game, nickname)) {
            // Si le joueur a terminé MVP
            if (game.mvp.PlayerName === nickname)
                games_mvp++;
            games_won++;
        }


        // 2. Score
        const gameScore = getScore(game, nickname);
        if (gameScore > highest_score)
            highest_score = gameScore;
        total_score += gameScore;

        
        
        
    }

    // Calcul des statistiques finales (moyennes, ...)
    
    // 1. Parties
    games_winrate = `${((games_won*100)/games_played).toFixed(2)}%`; 
    games_mvprate = `${((games_mvp*100)/games_won).toFixed(2)}%`; 


    // 2. Score
    avg_score = `${((total_score/games_played)).toFixed(1)}`;


    // Logs
    console.log('-=-=- STATS -=-=-');
    console.log(`Games : Played=${games_played}, Win=${games_won}, Rate=${games_winrate}, MVP=${games_mvp},  MVP%=${games_mvprate}`);
    console.log(`Score : Total=${total_score} (avg=${avg_score}, high=${highest_score}`);
    console.log(`TAB   : Goals=${goals}, Shots=${shots}, Ratio=${goal_ratio}`);
    console.log(`Assits: Total=${assits} (avg=${avg_assists})`);
    console.log(`Demos : Total=${demos} (avg=${avg_demos})`);
    console.log('-=-=-=-=-=-=-=-=-');

    const PlayerDatas = {
        nickname: nickname

    }
    
    // console.log(PlayerDatas);
    return PlayerDatas;
}



module.exports = {
    getPlayerData
};