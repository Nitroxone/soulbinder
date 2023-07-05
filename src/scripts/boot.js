/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

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