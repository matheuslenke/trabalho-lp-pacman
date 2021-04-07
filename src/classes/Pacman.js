import Phaser from 'phaser'

//  Direction consts
const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
const NONE = 4
const VELOCITY = 1

export default new Phaser.Class({
    initialize: function Pacman(scene, x, y) {
        this.alive = true
        this.score = 0
        this.lifes = 3
        this.powerup = 0
        this.nextDirection = RIGHT
        this.direction = RIGHT

        this.player = scene.physics.add.sprite(x, y, 'pacman').setScale(0.5)
        this.player.setDisplaySize(16, 16)

        this.player.anims.create({
            key: 'pacmanDown',
            frames: scene.anims.generateFrameNames('pacman', {
                frames: [6, 7, 8],
            }),
            frameRate: 10,
            repeat: -1,
            scale: 0.5,
        })

        this.player.anims.create({
            key: 'pacmanLeft',
            frames: scene.anims.generateFrameNames('pacman', {
                frames: [4, 5, 8],
            }),
            frameRate: 10,
            repeat: -1,
        })
        this.player.anims.create({
            key: 'pacmanRight',
            frames: scene.anims.generateFrameNames('pacman', {
                frames: [0, 1, 8],
            }),
            frameRate: 10,
            repeat: -1,
        })
        this.player.anims.create({
            key: 'pacmanUp',
            frames: scene.anims.generateFrameNames('pacman', {
                frames: [2, 3, 8],
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.player.anims.create({
            key: 'pacmanDie',
            frames: scene.anims.generateFrameNames('pacman', {
                frames: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            }),
            frameRate: 12,
            repeat: 0,
        })
        // this.player.setCollideWorldBounds(true)
        this.player.play('pacmanRight')
        // this.faceRight()
    },

    getPlayer() {
        return this.player
    },

    getPosition() {
        return {
            x: this.player.x,
            y: this.player.y,
        }
    },
    getDirection() {
        return this.direction
    },
    getNextDirection() {
        return this.nextDirection
    },
    directionUp() {
        return UP;
    },
    directionDown() {
        return DOWN;
    },
    directionLeft() {
        return LEFT;
    },
    directionRight() {
        return RIGHT;
    },
    wantToFaceLeft() {
        this.nextDirection = LEFT
    },
    wantToFaceRight() {
        this.nextDirection = RIGHT
    },
    wantToFaceDown() {
        this.nextDirection = DOWN
    },
    wantToFaceUp() {
        this.nextDirection = UP
    },
    update(mazeLayer, time, delta) {
        const { x, y } = this.player
        if (this.direction === LEFT) {
            const tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.player.x -= VELOCITY
            }
        } else if (this.direction === RIGHT) {
            const tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.player.x += VELOCITY
            }
        } else if (this.direction === UP) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.player.y -= VELOCITY
            }
        } else if (this.direction === DOWN) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.player.y += VELOCITY
            }
        }
        return true
    },

    turnDirection(mazeLayer) {
        const { x, y } = this.player
        if (x % 1 !== 0 || y % 1 !== 0) {
            return
        }
        if (this.nextDirection === LEFT && this.direction !== LEFT) {
            const tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (tile.collides || tile2.collides) {
                // console.log('Blocked left')
            } else {
                this.faceLeft()
            }
        } else if (this.nextDirection === RIGHT && this.direction !== RIGHT) {
            const tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (tile.collides || tile2.collides) {
                // console.log('Blocked right')
            } else {
                this.faceRight()
            }
        } else if (this.nextDirection === UP && this.direction !== UP) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (tile.collides || tile2.collides) {
                // console.log('Blocked up')
            } else {
                this.faceUp()
            }
        } else if (this.nextDirection === DOWN && this.direction !== DOWN) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (tile.collides || tile2.collides) {
                // console.log('Blocked down')
            } else {
                this.faceDown()
            }
        }
    },

    faceLeft() {
        this.direction = LEFT
        this.player.play('pacmanLeft')
    },

    faceRight() {
        this.direction = RIGHT
        this.player.play('pacmanRight')
    },

    faceUp() {
        this.direction = UP
        this.player.play('pacmanUp')
    },

    faceDown() {
        this.direction = DOWN
        this.player.play('pacmanDown')
    },

    getScore() {
        return this.score
    },
    hitFood() {
        this.score += 100
    },
    hitPowerup() {
        this.score += 1000
    },
})