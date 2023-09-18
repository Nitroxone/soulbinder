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

function getEonsSelectors(refresh = false) {
    let str = '';

    str += '<div class="es-box coolBorderBis">';

    for(const cat in Data.EON_CATEGORIES) {
        str += '<div class="es-category">';
        str += '<h2>' + cat + '</h2>';
        str += '<div class="es-categoryEons">';
        getUnlockedEonsWithType(Data.EON_CATEGORIES[cat]).forEach(eon => {
            str += '<h4>' + eon.title + '</h4>';
        });
        str += '</div>'
        str += '</div>';
    }

    str += '</div>';

    if(refresh) {
        document.querySelector('.eonsSelectors').innerHTML = str;
        return;
    }
    return str;
}

function getEonsPage(refresh = false) {
    let str = '';

    str += '';

    if(refresh) {
        document.querySelector('.eonsPage').innerHTML = str;
        return;
    }
    return str;
}

function drawEonTitles(refresh = false) {

}
