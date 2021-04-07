import Phaser from 'phaser'

import FoodImg from '../../assets/images/other/apple.png'
import PacmanSprite from '../../assets/images/Sprite_Sheets/pacman.png'
import BlinkySprite from '../../assets/images/Sprite_Sheets/blinky.png'
import PinkySprite from '../../assets/images/Sprite_Sheets/pinky.png'
import InkySprite from '../../assets/images/Sprite_Sheets/inky.png'
import ClydeSprite from '../../assets/images/Sprite_Sheets/clyde.png'

import Map from '../../assets/images/Sprite_Sheets/MazeTilemap.png'

import Pacman from '../classes/Pacman'
import Food from '../classes/Food'
import Fantasma from '../classes/Fantasma'
import Blinky from '../classes/Blinky'
import Pinky from '../classes/Pinky'
import Inky from '../classes/Inky'
import Clyde from '../classes/Clyde'

let pacman
let mazeLayer
let foodLayer
let powerupsLayer
let map
let gfx
let scoreText
let blinky
let pinky
let inky
let clyde

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
        this.frameTime = 0
    }

    preload() {
        this.load.image('food', FoodImg)
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
        this.load.image('map', Map)
    }

    create() {
        // Criação do labirinto
        map = this.make.tilemap({ key: 'map' })
        const tileset = map.addTilesetImage('MazeTilemap', 'tiles')

        mazeLayer = map.createLayer('Borders', tileset, 0, 24)
        foodLayer = map.createLayer('Food', tileset, 0, 24)
        powerupsLayer = map.createLayer('Powerups', tileset, 0, 24)

        gfx = this.add.graphics()

        // Criando o personagem
        pacman = new Pacman(this, 28, 36)

        // Controles do jogo
        blinky = new Blinky(this, 132, 36)
        pinky = new Pinky(this, 132, 64)
        inky = new Inky(this, 36, 256)
        clyde = new Clyde(this, 64, 230)

        // Adicionando colisão do mapa com pacman
        mazeLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(pacman.getPlayer(), mazeLayer)

        // Adicionando colisão com os fantasmas
        this.physics.add.collider(blinky.getBody(), mazeLayer)
        this.physics.add.collider(pinky.getBody(), mazeLayer)
        this.physics.add.collider(inky.getBody(), mazeLayer)
        this.physics.add.collider(clyde.getBody(), mazeLayer)

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys()
        // Texto de score
        scoreText = this.add.text(5, 5, '', { fontSize: '8px', fill: '#fff' })
        updateText()
    }

    update(time, delta) {
        if (!pacman.alive) {
            return
        }
        this.frameTime += delta
        // Checa se não está numa posição quebrada
        if (this.cursors.left.isDown) {
            pacman.wantToFaceLeft()
        } else if (this.cursors.right.isDown) {
            pacman.wantToFaceRight()
        } else if (this.cursors.up.isDown) {
            pacman.wantToFaceUp()
        } else if (this.cursors.down.isDown) {
            pacman.wantToFaceDown()
        }
        pacman.turnDirection(mazeLayer)

        // Checa se o pacman a cada atualização de posição colidiu com uma comida
        // ou se colidiu com um powerup
        if (pacman.update(mazeLayer, time, delta)) {
            checkHitFood()
            checkHitPowerup()
        }
        blinky.calculateRoute(mazeLayer, pacman.getPosition());
        blinky.update(mazeLayer, time, delta)
        pinky.calculateRoute(mazeLayer, pacman.getPosition());
        pinky.update(mazeLayer, time, delta)
        inky.calculateRoute(mazeLayer, pacman.getPosition());
        inky.update(mazeLayer, time, delta)
        clyde.calculateRoute(mazeLayer, pacman.getPosition());
        clyde.update(mazeLayer, time, delta)

        // Desenha linha dos fantasmas até seus alvos
        gfx.clear()
            .lineStyle(1, 0xff3300)
            .lineBetween(blinky.getPosition().x, blinky.getPosition().y, blinky.getTarget().x, blinky.getTarget().y)
            .lineStyle(1, 0xeb88df)
            .lineBetween(pinky.getPosition().x, pinky.getPosition().y, pinky.getTarget().x, pinky.getTarget().y)
            .lineStyle(1, 0x88e8eb)
            .lineBetween(inky.getPosition().x, inky.getPosition().y, inky.getTarget().x, inky.getTarget().y)
            .lineStyle(1, 0xecbf65)
            .lineBetween(clyde.getPosition().x, clyde.getPosition().y, clyde.getTarget().x, clyde.getTarget().y)

        // Atualiza movimento dos fantasmas
        if (time % 400 >= 0 && time % 400 <= 15) {
            // clyde.cycleDirection()
            // pinky.cycleDirection()
            // blinky.cycleDirection()
            // inky.cycleDirection()
        }
    }
}

function checkHitFood() {
    // Checa se está em cima de uma food
    const { x, y } = pacman.player
    const tile = foodLayer.getTileAtWorldXY(x, y, false)
    if (tile) {
        hitFood(tile)
    }
}

function hitFood(tile) {
    // Remove a food colidida e aumenta o score
    foodLayer.removeTileAt(tile.x, tile.y)
    pacman.hitFood()
    updateText()
    return false
}

function checkHitPowerup() {
    // Checa se está em cima de uma food
    const { x, y } = pacman.player
    const tile = powerupsLayer.getTileAtWorldXY(x, y, false)
    if (tile) {
        hitPowerup(tile)
    }
}

function hitPowerup(tile) {
    // Remove a food colidida e aumenta o score
    powerupsLayer.removeTileAt(tile.x, tile.y)
    pacman.hitPowerup()
    updateText()
    return false
}

function updateText() {
    scoreText.setText(pacman.getScore())
}