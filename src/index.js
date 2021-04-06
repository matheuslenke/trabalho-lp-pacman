// /* eslint-disable no-undef */
import Phaser from 'phaser'

import BootScene from './scenes/BootScene'
import TitleScene from './scenes/TitleScene'
import GameScene from './scenes/GameScene'
import GameOverScene from './scenes/GameOverScene'

// const gameSettings = {
//     playerSpeed: 100,
//     soundFx: {
//         mute: false,
//         volume: 1,
//         rate: 1,
//         detune: 0,
//         seek: 0,
//         loop: false,
//         delay: 0,
//       },
//       music: {
//         mute: false,
//         volume: 1,
//         rate: 1,
//         detune: 0,
//         seek: 0,
//         loop: true,
//         delay: 0,
//       },
// }

const config = {
    type: Phaser.AUTO,
    width: 224,
    height: 288,
    pixelArt: true,
    scale: {
        zoom: 3,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
            fps: 30,
        },
    },
    backgroundColor: '#000',
    parent: 'pacman',
    scene: [BootScene, TitleScene, GameScene, GameOverScene],
}

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config)
