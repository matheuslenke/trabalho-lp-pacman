import Phaser from 'phaser'

import PacmanSprite from '../../assets/images/Sprite_Sheets/pacman.png'
import BlinkySprite from '../../assets/images/Sprite_Sheets/blinky.png'
import PinkySprite from '../../assets/images/Sprite_Sheets/pinky.png'
import InkySprite from '../../assets/images/Sprite_Sheets/inky.png'
import ClydeSprite from '../../assets/images/Sprite_Sheets/clyde.png'

import Pacman from '../classes/Pacman'
import Food from '../classes/Food'
import Fantasma from '../classes/Fantasma'
import Blinky from '../classes/Blinky'
import Pinky from '../classes/Pinky'
import Inky from '../classes/Inky'
import Clyde from '../classes/Clyde'

export default class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' })
        this.restart = false
    }

    preload() {
        this.load.spritesheet('pacman', PacmanSprite, {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.image('tiles', Map)
        this.load.tilemapTiledJSON('map', '../assets/tilemaps/maze1.json')
        this.load.spritesheet('blinky', BlinkySprite, {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet('pinky', PinkySprite, {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet('inky', InkySprite, {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet('clyde', ClydeSprite, {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.audio('win', '../../assets/audio/winSound.wav')
    }

    create() {
        this.pacman = new Pacman(this, 115, 36, null, 2)

        // Controles do jogo
        this.blinky = new Blinky(this, 170, 140)
        this.pinky = new Pinky(this, 140, 140)
        this.inky = new Inky(this, 110, 140)
        this.clyde = new Clyde(this, 80, 140)

        this.add.text(60, 50, 'You win!', {
            font: '14px Emulogic',
            fill: '#7744ff',
        })
        this.add.text(10, 112, 'Press enter to play again', {
            font: '8px Emulogic',
            fill: '#7744ff',
        })
        this.enterKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        )
        this.input.keyboard.once(
            'keyup-ENTER',
            function () {
                this.scene.start('GameScene')
            },
            this
        )
        // this.time.addEvent({
        //     delay: 3000,
        //     loop: false,
        //     callback: () => {
        //         this.scene.start('GameScene', {
        //             gameOver: false,
        //         })
        //     },
        // })
        this.cursors = this.input.keyboard.createCursorKeys
        const winSound = this.sound.add('win')
        winSound.play()
    }

    update(time, delta) {
        if (this.restart === true) {
            console.log('Restart')
            this.scene.pause()
            this.scene.run('GameScene')
        }

        // Atualiza movimento dos fantasmas
        if (time % 400 >= 0 && time % 400 <= 15) {
            this.clyde.cycleDirection()
            this.pinky.cycleDirection()
            this.blinky.cycleDirection()
            this.inky.cycleDirection()
        }
    }
}
