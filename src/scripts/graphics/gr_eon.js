function drawEonScreen() {
    document.querySelector('#eonsDiv').innerHTML = '<div class="eonsContainer"></div>';
    let str = '';

    str += '<div class="eonsSelectors">';
    str += getEonsSelectors();
    str += '</div>';

    str += '<div class="eonsPage">';
    str += getEmptyEonsPage();
    str += '</div>';

    document.querySelector('.eonsContainer').innerHTML = str;

    generateEonsEvents();
}

function undisplayCurrentEon() {
    const eonTitle = document.querySelector('.es-eonTitle.active');

    if(!eonTitle) return;

    eonTitle.classList.remove('active');
    getEmptyEonsPage(true);
}

function displayCurrentEon(eon, pageNum = 1) {
    let str = '';
    const unlocked = eon.fragments.filter(x => x.unlocked).length;
    const total = eon.fragments.length;
    const frag = eon.fragments[pageNum-1];
    
    str += '<div class="eonPageContainer">';
    str += '<div class="ep-title">' + eon.title + '</div>';

    str += '<div class="ep-subTitle">';
    str += '<h2 class="ep-author">' + (eon.author ? 'by ' + eon.author : '') + '</h2>';
    str += '<h2 class="ep-progress">' + pageNum + ' / ' + total + '</h2>';
    str += '</div>';

    if(frag.unlocked) str += '<div class="ep-part">' + frag.text + '</div>';
    str += '</div>';

    // PAGINATION
    if(unlocked > 1) {
        const hasNext = eon.fragments[pageNum]?.unlocked;
        const hasPrev = eon.fragments[pageNum-2]?.unlocked;

        str += '<div class="ep-controls">';
        if(hasPrev) str += '<div class="ep-controls-prev"></div>';
        if(hasNext) str += '<div class="ep-controls-next"></div>';

        str += '</div>';
    }

    document.querySelector('.eonsPage').innerHTML = str;
    if(unlocked > 1) generateEonsPaginationEvents(eon, pageNum);
}

function getEonsSelectors(refresh = false) {
    let str = '';

    str += '<div class="es-box coolBorderBis">';

    str += '<input type="text" class="es-box-search" placeholder="Search for an eon...">';

    for(const cat in Data.EonCategory) {
        const eons = getUnlockedEonsWithType(Data.EonCategory[cat]);

        str += '<div class="es-category">';
        str += '<h2 class="es-categoryTitle">' + cat + '</h2>';
        str += '<div class="es-categoryEons">';
        if(eons.length === 0) str += '<h3>No eon unlocked in this category</h3>';
        else eons.forEach(eon => {
            str += '<h4 class="es-eonTitle">' + eon.title + '</h4>';
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

function getEmptyEonsPage(refresh = false) {
    let str = '';

    str += '<div class="emptyEonPageContainer">';
    str += '<h1>Select an eon</h1>';
    str += '<h3>to display it here</h3>';
    str += '</div>';

    if(refresh) {
        document.querySelector('.eonsPage').innerHTML = str;
        return;
    }
    return str;
}

function drawEonTitles(refresh = false) {

}
