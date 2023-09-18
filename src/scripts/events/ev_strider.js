function generateBonusesTooltipListEvents(tooltip) {
    tooltip.querySelectorAll('.bonusesTooltip-single').forEach(bo => {
        bo.addEventListener('click', () => {
            bo.classList.toggle('extended');
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
        });
    });
}