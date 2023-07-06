/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * This file starts the game once the page is fully loaded.
 */
window.onload = () => {
    console.log('Assets loaded.');
    game = new Game();
    game.launch();
    console.log('Game launched.');
}