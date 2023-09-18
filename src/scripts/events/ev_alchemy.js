function generateAlchemyInterfaceEvents() {
    const ingredients = document.querySelectorAll('.alchIngredient');
    for(let i = 0; i < ingredients.length; i++) {
        const ingr = ingredients[i];
        ingr.addEventListener('contextmenu', e => {
            e.preventDefault();
            if(game.alchemy.ingredients[i]) {
                game.alchemy.removeIngredient(i);
                getAlchemyPotionPreviewEffects(true);
            }
        });
    }

    document.querySelector('.alchPotionPreview-vignette').addEventListener('click', e => {
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);

        if(document.querySelector('.vignetteSelector')) {
            document.querySelector('.vignetteSelector').remove();
            return;
        }

        const div = document.createElement('div');
        div.classList.add('vignetteSelector');

        let str = '';

        str += '<h2 class="selectorTitle">Bottle selector</h3>';
        str += '<h3 class="selectedTitle">' + game.alchemy.icon.name + '</h4>';
        str += '<div class="divider"></div>';
        str += '<div class="selectorItems">'

        Icons.Methods.getAllUnlocked('potions').forEach(pot => {
            str += '<div id="vignettePotion-' + pot.icon + '" class="selectorItem' + (pot === game.alchemy.icon ? ' vignetteSelected' : '') + '" style="background-image: url(\'css/img/potions/' + pot.icon + '.png\')"></div>';
        });

        str += '</div>';

        str += '<div class="closeWindowButton selectorClose">X</div>';

        div.innerHTML = str;

        div.querySelectorAll('.selectorItem').forEach(item => {
            item.addEventListener('click', e => {
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
                if(!(item.id === 'vignettePotion-' + game.alchemy.icon.icon)) {
                    const id = parseInt(item.id.slice(15));
                    const icon = Icons.Methods.findByIcon("potions", id);

                    document.querySelector('#vignettePotion-' + game.alchemy.icon.icon).classList.remove('vignetteSelected');
                    item.classList.add('vignetteSelected');
                    document.querySelector('.selectedTitle').textContent = icon.name;

                    game.alchemy.selectIcon(icon);
                    document.querySelector('.alchPotionPreview-vignette').style.backgroundImage = 'url(\'css/img/potions/' + game.alchemy.icon.icon + '.png\')';
                }
            });
        });

        document.querySelector('.alchPotionPreview').appendChild(div);
        document.querySelector('.closeWindowButton').addEventListener('click', e => {
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            div.remove();
        });
    });

    document.querySelector('.alchBrew').addEventListener('click', e => {
        if(!game.alchemy.isBrewing) {
            Sounds.Methods.playSound(Data.SoundType.CRAFT_BUTTON_ALCHEMY);
            Sounds.Methods.playSound(Data.SoundType.CRAFT_POTION_BREW);
            Quanta.burst({
                canvas: document.querySelector('.alchBrewCanvas'),
                color: Data.Color.BLUE,
                amount: 300,
                particleSize: 2,
                duration: 4000,
                fadeAwayRate: 0,
                speed: {
                    x: () => { return (-2 + Math.random() * 5) },
                    y: () => { return (-4 + Math.random() * 10) }
                },
                delay: () => { return getRandomNumber(0, 100) }
            });

            game.alchemy.brewing();

            document.querySelector('.alchBrewGauge').style.display = 'block';
            document.querySelector('.alchemyGauge').classList.add('alchGaugeFill');
            setTimeout(() => {
                game.alchemy.brew();
                Sounds.Methods.playSound(Data.SoundType.CRAFT_POTION_RESULT);
                document.querySelector('.alchBrewGauge').style.display = '';
                document.querySelector('.alchemyGauge').classList.remove('alchGaugeFill');
            }, 1800);
        }
    });
}

function generateAlchemyIngredientEvents(ingr) {
    const dom = document.querySelectorAll('.alchIngredient')[game.alchemy.ingredients.indexOf(ingr)];

    dom.querySelectorAll('.toggleButton').forEach(but => {
        but.addEventListener('click', e => {
            unselectAllAlchemyIngredientSelectors(dom);
            if(ingr.select(but.textContent.toLowerCase())) {
                but.classList.toggle('off');
            }
            getAlchemyPotionPreviewEffects(true);

            Sounds.Methods.playSound(Data.SoundType.SELECTOR);
        })
    })
}