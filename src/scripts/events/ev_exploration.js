function generateExplorationHubEvents() {
    const biomes = document.querySelectorAll('.eh-biomeCategory');

    biomes.forEach(bio => {
        bio.addEventListener('click', e => {
            bio.classList.toggle('extended');
        });
    });
}