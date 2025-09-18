function toggleDetails(MatchID) {
    const details = document.getElementById('details_'+MatchID);
    if (details.classList.contains('active')) {
        details.classList.remove('active');
    } else {
        details.classList.add('active');
    }
    console.log("MatchID Got : ", MatchID);
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
    if (getPageByOnClick(element)===myLocation) {
        element.classList.add('ActivePage');
    }
}