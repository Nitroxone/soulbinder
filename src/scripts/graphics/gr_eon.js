function drawEonScreen() {
    document.querySelector('#eonsDiv').innerHTML = '<div class="eonsContainer"></div>';
    let str = '';

    str += '<div class="eonsSelectors">';
    str += getEonsSelectors();
    str += '</div>';

    str += '<div class="eonsPage">';
    str += getEonsPage();
    str += '</div>';

    document.querySelector('.eonsContainer').innerHTML = str;
}

function getEonsSelectors() {
    
}

function drawEonTitles(refresh = false) {

}
