function generateEonsEvents() {
    const eonCategories = document.querySelectorAll('.es-categoryTitle');
    const eonTitles = document.querySelectorAll('.es-eonTitle')

    eonCategories.forEach((title) => {
        title.addEventListener('click', e => {
            title.classList.toggle('extended');
        });
    });

    eonTitles.forEach(title => {
        title.addEventListener('click', e => {
            undisplayCurrentEon();
            title.classList.toggle('active');
            game.selectedEon = getUnlockedEonFromTitle(title.textContent);
            displayCurrentEon(true);
        })
    })
}

function searchEon(refresh = false) {
    const eonSearchBar = document.querySelector('.eonSearchBar');
    const eonsTitles = document.querySelectorAll('.eonTitle');

    eonSearchBar.addEventListener('input', e => {
        const value = eonSearchBar.value.toLowerCase().trim();

        eonsTitles.forEach(title => {
            const titleText = title.querySelector('.eonTitleContent').innerText.toLowerCase();

            if (titleText.includes(value)) {
                title.style.display = 'flex';
            } else {
                title.style.display = 'none';
            }
        });
    });

    if(refresh) {
        eonSearchBar.value = '';
    }
}