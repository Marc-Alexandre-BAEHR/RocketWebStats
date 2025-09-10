function toggleDetails(MatchID) {
    const details = document.getElementById('details_'+MatchID);
    if (details.classList.contains('active')) {
        details.classList.remove('active');
    } else {
        details.classList.add('active');
    }
}