function generateEonEvents() {
    const eonTitles = document.querySelectorAll('.eonTitle');

    eonTitles.forEach((title, index) => {
        title.addEventListener('click', () => {
            drawEonFragments(game.all_eons[index], true);

            eonTitles.forEach(otherTitle => {
                otherTitle.classList.remove('eonTitleActive');
            });

            title.classList.add('eonTitleActive');
        });
    });
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