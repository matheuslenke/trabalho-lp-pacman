// /* eslint-disable no-undef */
import Phaser from 'phaser'

import BootScene from './scenes/BootScene'
import TitleScene from './scenes/TitleScene'
import GameScene from './scenes/GameScene'

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
    width: 600,
    height: 800,
    pixelArt: true,
    scale: {
        zoom: 1,
    },
    backgroundColor: '#333',
    parent: 'pacman',
    scene: [BootScene, TitleScene, GameScene]
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config)
