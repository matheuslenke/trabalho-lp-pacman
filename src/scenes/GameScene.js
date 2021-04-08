import Phaser from 'phaser'

import PacmanSprite from '../../assets/images/Sprite_Sheets/pacman.png'
import BlinkySprite from '../../assets/images/Sprite_Sheets/blinky.png'
import PinkySprite from '../../assets/images/Sprite_Sheets/pinky.png'
import InkySprite from '../../assets/images/Sprite_Sheets/inky.png'
import ClydeSprite from '../../assets/images/Sprite_Sheets/clyde.png'
// import GameStartAudio from '../../assets/audio/opening.mp3'
import Map from '../../assets/images/Sprite_Sheets/MazeTilemap.png'

import Pacman from '../classes/Pacman'
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

    init() {
        this.gameOver = false
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
        this.load.image('map', Map)

        // Audios
        this.load.audio('opening', '../../assets/audio/opening.mp3')
        this.load.audio('pacmanDie', '../../assets/audio/pacmanDie.mp3')
        this.load.audio('pacmanWalk', '../../assets/audio/wakawaka.mp3')
    }

    create() {
        // Inicialização do jogo
        this.startGame()

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys()
        // Texto de score
        scoreText = this.add.text(5, 5, '', { fontSize: '8px', fill: '#fff' })
        updateText()
    }

    update(time, delta) {
        // Faz ficar com 30 fps

        if (!pacman.alive) {
            return
        }
        if (pacman.hasWin() === true) {
            this.scene.start('WinScene')
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
        if (time % 20 >= 0 && time % 20 <= 15) {
            blinky.setTarget(mazeLayer, pacman)
            blinky.calculateRoute(mazeLayer)
            blinky.turnDirection(mazeLayer)
            blinky.update(mazeLayer, time, delta)
            pinky.setTarget(mazeLayer, pacman)
            pinky.calculateRoute(mazeLayer)
            pinky.turnDirection(mazeLayer)
            pinky.update(mazeLayer, time, delta)
            inky.setTarget(mazeLayer, pacman, blinky)
            inky.calculateRoute(mazeLayer)
            inky.turnDirection(mazeLayer)
            inky.update(mazeLayer, time, delta)
            clyde.setTarget(mazeLayer, pacman)
            clyde.calculateRoute(mazeLayer)
            clyde.turnDirection(mazeLayer)
            clyde.update(mazeLayer, time, delta)

            // Desenha linha dos fantasmas até seus alvos
            gfx.clear()
                .lineStyle(1, 0xff3300)
                .lineBetween(
                    blinky.getPosition().x,
                    blinky.getPosition().y,
                    blinky.getTarget().x,
                    blinky.getTarget().y
                )
                .lineStyle(1, 0xeb88df)
                .lineBetween(
                    pinky.getPosition().x,
                    pinky.getPosition().y,
                    pinky.getTarget().x,
                    pinky.getTarget().y
                )
                .lineStyle(1, 0x88e8eb)
                .lineBetween(
                    inky.getPosition().x,
                    inky.getPosition().y,
                    inky.getTarget().x,
                    inky.getTarget().y
                )
                .lineStyle(1, 0xecbf65)
                .lineBetween(
                    clyde.getPosition().x,
                    clyde.getPosition().y,
                    clyde.getTarget().x,
                    clyde.getTarget().y
                )
        }
    }

    startGame() {
        // Tocar a música de intro
        // this.scene.pause()
        // const openingMusic = this.sound.add('opening')
        // openingMusic.play()
        // openingMusic.once(
        //     Phaser.Sound.Events.COMPLETE,
        //     () => {
        //         this.scene.resume()
        //     },
        //     this
        // )
        const walkMusic = this.sound.add('pacmanWalk')
        // Criação do labirinto
        map = this.make.tilemap({ key: 'map' })
        const tileset = map.addTilesetImage('MazeTilemap', 'tiles')

        mazeLayer = map.createLayer('Borders', tileset, 0, 24)
        foodLayer = map.createLayer('Food', tileset, 0, 24)
        powerupsLayer = map.createLayer('Powerups', tileset, 0, 24)

        // Gráficos das linhas para debug
        gfx = this.add.graphics()

        // Criando o personagem
        pacman = new Pacman(this, 202, 140, walkMusic, 246)

        // Criando fantasmas
        blinky = new Blinky(this, 132, 36)
        pinky = new Pinky(this, 132, 64)
        inky = new Inky(this, 36, 256)
        clyde = new Clyde(this, 52, 230)

        // Adicionando colisão do mapa com pacman
        mazeLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(pacman.getPlayer(), mazeLayer)

        // Adicionando colisão com os fantasmas
        this.physics.add.collider(blinky.getBody(), mazeLayer)
        this.physics.add.collider(
            blinky.getBody(),
            pacman.getPlayer(),
            this.hitGhost,
            null,
            this
        )
    }

    restartGame() {
        this.scene.pause()
        const openingMusic = this.sound.add('opening')
        openingMusic.play()
        openingMusic.once(
            Phaser.Sound.Events.COMPLETE,
            () => {
                this.scene.resume()
            },
            this
        )
        pacman.startPosition(28, 36)
        this.physics.resume()
    }

    resumeScene() {
        this.scene.resume()
    }

    hitGhost(ghost, pacmanSprite) {
        if (pacman.alive && !pacman.powerup) {
            this.physics.pause()
            const dieSound = this.sound.add('pacmanDie')
            dieSound.play()
            dieSound.once(
                Phaser.Sound.Events.COMPLETE,
                () => {
                    if (!this.gameOver) {
                        pacman.alive = true
                        this.restartGame()
                    } else {
                        this.runGameOver()
                    }
                },
                this
            )
            const gameOver = pacman.hitGhost(this)
            if (gameOver) {
                this.gameOver = true
            }
        }
    }

    runGameOver() {
        this.scene.pause()
        this.scene.start('GameOverScene')
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
