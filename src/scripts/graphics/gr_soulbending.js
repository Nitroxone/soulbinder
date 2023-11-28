function getSwBend(refresh = false) {
    let str = '';

    str += '<div class="soulbending-item">';
    str += getSoulbendingItem();
    str += '</div>';

    if(refresh) {
        document.querySelector('#soulwcontent-bend').innerHTML = str;
        return;
    }
    return str;
}

function getSoulbendingItem(refresh = false) {
    let str = '';

    if(refresh) {
        document.querySelector('.soulbending-item').innerHTML = str;
        return;
    }
    return str;
}