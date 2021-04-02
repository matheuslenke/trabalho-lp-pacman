import Phaser from 'phaser'

import FoodImg from '../../assets/images/other/apple.png'
import PacmanSprite from '../../assets/images/Sprite_Sheets/pacman.png'

import Map from '../../assets/images/Sprite_Sheets/MazeTilemap.png'

import Pacman from '../classes/Pacman'
import Food from '../classes/Food'

let pacman
let mazeLayer
let foodLayer
let powerupsLayer
let map
let scoreText

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
    }

    create() {
        // Criação do labirinto
        map = this.make.tilemap({ key: 'map' })
        const tileset = map.addTilesetImage('MazeTilemap', 'tiles')

        mazeLayer = map.createLayer('Borders', tileset, 0, 24)
        foodLayer = map.createLayer('Food', tileset, 0, 24)
        powerupsLayer = map.createLayer('Powerups', tileset, 0, 24)

        // Criando o personagem
        pacman = new Pacman(this, 28, 36)

        // Adicionando colisão do mapa com pacman
        mazeLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(pacman.getPlayer(), mazeLayer)

        // Controles do jogo
        this.cursors = this.input.keyboard.createCursorKeys()
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
