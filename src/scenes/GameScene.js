import Phaser from 'phaser'

import FoodImg from '../../assets/images/other/apple.png'
import PacmanSprite from '../../assets/images/pacman.png'
import BlinkySprite from '../../assets/images/Sprite_Sheets/blinky.png'
import PinkySprite from '../../assets/images/Sprite_Sheets/pinky.png'
import InkySprite from '../../assets/images/Sprite_Sheets/inky.png'
import ClydeSprite from '../../assets/images/Sprite_Sheets/clyde.png'

import Map from '../../assets/images/map.png'

import Pacman from '../classes/Pacman'
import Food from '../classes/Food'
import Fantasma from '../classes/Fantasma'
import Blinky from '../classes/Blinky'
import Pinky from '../classes/Pinky'
import Inky from '../classes/Inky'
import Clyde from '../classes/Clyde'

let pacman
let blinky
let pinky
let inky
let clyde
let platforms

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    preload() {
        this.load.image('food', FoodImg)
        this.load.spritesheet('pacman', PacmanSprite, {
            frameWidth: 26,
            frameHeight: 26,
        })
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
        this.load.image('map', Map)
    }

    create() {
        this.add.image(300, 400, 'map')

        this.food = new Food(this, 3, 4)

        platforms = this.physics.add.staticGroup()

        platforms.create(400, 568, 'food').setScale(10).refreshBody()

        pacman = new Pacman(this, 15, 8)
        blinky = new Blinky(this)
        pinky = new Pinky(this)
        inky = new Inky(this)
        clyde = new Clyde(this)

        this.physics.add.collider(pacman.getBody(), platforms)
        this.physics.add.collider(blinky.getBody(), platforms)
        this.physics.add.collider(pinky.getBody(), platforms)
        this.physics.add.collider(inky.getBody(), platforms)
        this.physics.add.collider(clyde.getBody(), platforms)
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time, delta) {
        if (!pacman.alive) {
            return
        }
        if (this.cursors.left.isDown) {
            pacman.faceLeft()
        } else if (this.cursors.right.isDown) {
            pacman.faceRight()
        } else if (this.cursors.up.isDown) {
            pacman.faceUp()
        } else if (this.cursors.down.isDown) {
            pacman.faceDown()
        }
        if (time % 400 >= 0 && time % 400 <= 15) {
            clyde.cycleDirection();
            pinky.cycleDirection();
            blinky.cycleDirection();
            inky.cycleDirection();
        }
    }
}