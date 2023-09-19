function generateEonsEvents() {
    const eonCategoryTitles = document.querySelectorAll('.es-categoryTitle');
    const eonCategories = document.querySelectorAll('.es-categoryEons');
    const eonTitles = document.querySelectorAll('.es-eonTitle');
    const searchBar = document.querySelector('.es-box-search');

    eonCategoryTitles.forEach((title) => {
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
        });
    });

    /**
     * Searches for an eon and hides all unmatching entries.
     * Hides empty categories as well.
     */
    searchBar.addEventListener('input', e => {
        const val = searchBar.value.toLowerCase().trim();

        eonTitles.forEach(title => {
            const txt = title.textContent.toLowerCase().trim();

            if(txt.includes(val)) title.style.display = 'block';
            else title.style.display = 'none';

            if(areSiblingsHidden(title)) title.parentNode.parentNode.style.display = 'none';
            else title.parentNode.parentNode.style.display = 'block';
        });
        if(val !== '') eonCategories.forEach(cat => {
            const checker = cat.querySelector('.es-eonTitle');
            if(!checker) cat.parentNode.style.display = 'none';
        }); 
        else eonCategories.forEach(cat => {
            cat.parentNode.style.display = 'block';
        })
    })
}