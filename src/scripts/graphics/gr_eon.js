function drawEonScreen() {
    document.querySelector('#eonsDiv').innerHTML = '<div class="eonsContainer"></div>';
    let str = '';

    str += '<div class="diary">';

    str += '<div class="diaryFirstCol">';
    str += '<div class="leftPage pages">';
    str += '<h2 class="leftPageTitle pageTitle">Eons</h2>';
    str += '<div class="eonsBorder"></div>';
    str += '<input class ="eonSearchBar" type="text" id="eonSearchInput" placeholder="Search eon..." />';
    str += '<div class="eonTitlesContainer">';


    str += drawEonTitles();

    str += '</div>';
    str += '</div>';
    str += '</div>';

    str += '<div class="diarySecondCol">';
    str += '<div class="rightPage pages">';
    str += '<h2 class="rightPageTitle pageTitle">Fragments</h2>';
    str += '<div class="eonsBorder"></div>';
    str += '<div class="eonFragmentsContainer">';

    str += '</div>';
    str += '</div>';
    str += '</div>';

    str += '</div>';

    document.querySelector('.eonsContainer').innerHTML = str;

    generateEonEvents();
    searchEon();
}

function addEonTitlesContainerOverflowYScroll() {
    const eonTitlesContainer = document.querySelector('.eonTitlesContainer');
    if(!isElementEmpty(eonTitlesContainer)) {
        eonTitlesContainer.style.overflowY = "scroll";
    }
}

function addEonFragmentsContainerOverflowYScroll() {
    const eonFragmentsContainer = document.querySelector('.eonFragmentsContainer');
    if(!isElementEmpty(eonFragmentsContainer)) {
        eonFragmentsContainer.style.overflowY = "scroll";
    }
}

function drawEonTitles(refresh = false) {
    let str = '';

    game.all_majorEons.forEach(eon => {
        if (eon.unlocked) {
            str += '<div class="eonTitle">';
            str += '<div class="eonTitleBullet"></div>';
            str += '<p class="eonTitleContent">';
            str += eon.title;
            str += '</p>';
            str += '</div>';
        }
    });

    if(refresh) {
        document.querySelector('.eonTitlesContainer').innerHTML = str;
        generateEonEvents();
        searchEon(true);
        addEonTitlesContainerOverflowYScroll();
        return;
    }
    return str;
}

function drawEonFragments(eon, refresh = false) {
    let str = '';
    eon.fragments.forEach(fragment => {
        if (fragment.unlocked) {
            str += '<div class="eonFragment">';
            str += fragment.text;
            str += '</div>';
        }
    });

    document.querySelector('.eonFragmentsContainer').innerHTML = str;

    if (refresh) {
        addEonFragmentsContainerOverflowYScroll();
    }
}