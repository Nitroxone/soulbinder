function drawHubScreen() {

    document.querySelector('#hubDiv').innerHTML = '<div class="hubContainer"></div>';
    let str = '';

    str += '<div class="hub">';

    str += '<div class="quests">';
    str += '</div>'

    str += '<div class="merchants">';
    str += '<div class="auctionHouse coolBorderBis">';
    str += '</div>'

    str += '<div class="blackMarket coolBorderBis">';
    str += '</div>';

    str += '</div>';

    str += '<div class="lordContainer">';

    str += '<div class="lordDialogueContent coolBorderBis">'

    str += '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptate in, optio a laboriosam iure error impedit inventore accusantium quo incidunt cumque consequatur dolorem libero quod necessitatibus aliquam rerum eaque iusto alias iste maiores voluptas quia consectetur. Nesciunt consequatur minima quos, vel exercitationem, ducimus non maiores eligendi repellendus quod rerum minus quis voluptatibus. Natus mollitia itaque aperiam dolor debitis officiis facilis tempora id? Dolore recusandae rerum voluptas, aut adipisci alias inventore non aliquam asperiores iste pariatur perspiciatis harum velit magni explicabo, fuga aliquid expedita earum neque modi. Dolorum illum, id tempore perferendis eum delectus, mollitia repudiandae, architecto deserunt quam dolor?</p>';

    str += '<div class="lordDialogueContent-buttons">'
    str += '<button>Previous</button>'
    str += '<button>Next</button>'
    str += '</div>';

    str += '</div>';

    str += '<div class="lordVignette">'
    str += '</div>';

    str += '</div>';

    str += '</div>';

    document.querySelector('.hubContainer').innerHTML = str;

    drawBlackMarket();
}

function drawWorkshopScreen() {
    document.querySelector('#workshopDiv').innerHTML = '<div class="workshopContainer"></div>';

    let str = '';
    str += '<div class="workshopMenu">';

    str += '<div class="alchInterface">';
    str += drawAlchemyScreen();
    str += '</div>';

    str += '<div class="craftInterface"></div>';

    str += '<div class="soulwInterface">'
    str += drawSoulwritingScreen();
    str += '</div>';

    str += '<div class="soulbInterface">'
    str += drawSoulbindingScreen();
    str += '</div>';

    str += '<div class="paragInterface"></div>';

    str += '</div>';

    document.querySelector('.workshopContainer').innerHTML = str;

    generateAlchemyInterfaceEvents();
    drawSoulwritingLines();
    generateSoulwritingInterfaceEvents();
    generateSoulbindingInterfaceEvents();
    generateSoulreadingInterfaceEvents();
}