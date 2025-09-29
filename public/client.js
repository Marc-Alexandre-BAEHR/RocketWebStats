// const { getPlayerDataByNickname } = require("../Js/getPlayerData");

// const { generateJSON } = require("../Js/getMatchData");

function toggleDetails(MatchID) {
    const details = document.getElementById('details_'+MatchID);
    if (details.classList.contains('active')) {
        details.classList.remove('active');
    } else {
        details.classList.add('active');
    }
    // console.log("MatchID Got : ", MatchID);
}

function getPageByOnClick(element) {
    const getlink = element.attributes[0].nodeValue;
    const splitted = getlink.split('=');
    const locationHref = splitted[1];
    const final = locationHref.slice(1, locationHref.length - 1);
    return final;
}


// Method to get the actual loc
const myLocation = location.href.slice(location.origin.length, location.href.length);

const elements = document.querySelectorAll('#left-sidebar-id button');
for (const element of elements) {
    element.classList.remove('ActivePage');
    if (getPageByOnClick(element) === myLocation) {
        element.classList.add('ActivePage');
    }
}

// Method to get the time in real-time 
// 'sidebar-time';
const DivTime = document.getElementById('sidebar-time');

function pad(n, x) {
    return n.toString().padStart(x, '0');
}

function refresh() {
    var date = new Date();
    var str = pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2) + ':' + pad(date.getSeconds(), 2);
    var strMS = '.'+pad(date.getMilliseconds(), 3);

    DivTime.innerHTML = `<br>${str}<span class="timeMS">${strMS}</span><br>Paris, France`;
}

refresh();
window.onload = function() {
    refresh();
    setInterval(() => {
        refresh();
    }, 69   );
}







async function refreshHeader() {
    try {
        const res = await fetch('/api/update');
        if (!res.ok) {
            console.log(res);
            return;
        } 
        else
            console.log(new Date()  );
    } catch (e) {
    }
}
setInterval(refreshHeader, 10000);