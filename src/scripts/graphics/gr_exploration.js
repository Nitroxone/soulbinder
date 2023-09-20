function drawExplorationHubScreen() {
    document.querySelector('#explorationDiv').innerHTML = '<div class="explorationHub"></div>';

    let str = '';

    str += '<div class="eh-header">';
    str += '<h1 class="eh-mainTitle">Exploration</h1>'
    str += '<h2 class="eh-subTitle">Dive into time-altered realms, gather eons and loot, face unforgiving foes and cryptic enigmas.</h2>';
    str += '</div>';

    str += '<div class="eh-main">';
    str += '</div>';


    document.querySelector('.explorationHub').innerHTML = str;
}
