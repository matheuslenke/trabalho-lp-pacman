// /* eslint-disable no-undef */
import Phaser from 'phaser'

import BootScene from './scenes/BootScene'
import TitleScene from './scenes/TitleScene'
import GameScene from './scenes/GameScene'
import GameOverScene from './scenes/GameOverScene'
import WinScene from './scenes/WinScene'

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
            fps: 60,
        },
    },
    fps: {
        target: 60,
        min: 30,
        forceSetTimeOut: true,
    },
    backgroundColor: '#000',
    parent: 'pacman',
    scene: [BootScene, TitleScene, GameScene, GameOverScene, WinScene],
}

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config)
