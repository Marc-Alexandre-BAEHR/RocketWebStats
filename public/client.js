function toggleDetails(MatchID) {
    const details = document.getElementById('details_'+MatchID);
    if (details.classList.contains('active'))
        details.classList.remove('active');
    else
        details.classList.add('active');
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
const TimeRefreshing = document.getElementById('TimeRefreshing');
const DivTime = document.getElementById('sidebar-time');
const cooldown = 6000; // in MS




function pad(n, x) { return n.toString().padStart(x, '0'); }

function refresh() {
    var date = new Date();
    var str = pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2) + ':' + pad(date.getSeconds(), 2);
    var strMS = '.' + pad(date.getMilliseconds(), 3);

    DivTime.innerHTML = `<br>${str}<span class="timeMS">${strMS}</span><br>Paris, France`;
}

function formatRefreshTimer(timeLeft)
{
    timeRebased = timeLeft/1000

    if (timeRebased > 10)
        return `${pad((timeRebased).toFixed(0))}s`;
    if (timeRebased < 10 && timeRebased > 3)
        return `${pad((timeRebased).toFixed(1))}s`;
    return `${pad((timeRebased).toFixed(2))}s`;
        
}

function formatDate(date)
{
    const hours = pad(date.getHours(), 2);
    const minutes = pad(date.getMinutes(), 2);
    const seconds = pad(date.getSeconds(), 2);
    return `${hours}:${minutes}.${seconds}`;
}
let LastRefresh = new Date();

refresh();
window.onload = function() {
    refresh();
    setInterval(() => {
        refresh();
        calculTime(LastRefresh, cooldown);

    }, 69   );
}







function calculTime(refreshDate, cooldown)
{
    const actTime = new Date();
    const actTime_timestamp = actTime.getTime();
    const refreshDate_timestamp = refreshDate.getTime();


    const timeLeft = cooldown - (actTime_timestamp - refreshDate_timestamp);
    TimeRefreshing.innerHTML = `Refresh in ${formatRefreshTimer(timeLeft)}`;

    return timeLeft;
}



async function refreshHeader() {
    LastRefresh = new Date();
    updateDatas();
}
setInterval(refreshHeader, cooldown);