import Phaser from 'phaser'

//  Direction consts
const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
const NONE = 4
const VELOCITY = 1

export default new Phaser.Class({
    initialize: function Pacman(scene, x, y, walkMusic, totalFood) {
        this.alive = true
        this.score = 0
        this.lives = 3
        this.powerup = false
        this.nextDirection = RIGHT
        this.direction = RIGHT
        this.walkMusic = walkMusic
        this.playingWalkMusic = false
        this.foodEaten = 0
        this.totalFood = totalFood
        // Adicionando imagem das vidas
        const life1 = scene.physics.add.image(216, 280, 'pacman')
        const life2 = scene.physics.add.image(200, 280, 'pacman')
        const life3 = scene.physics.add.image(184, 280, 'pacman')
        this.lifeImages = []
        this.lifeImages.push(life3, life2, life1)

        // Criando sprite do player
        this.player = scene.physics.add.sprite(x, y, 'pacman').setScale(0.5)
        this.player.setDisplaySize(16, 16)

        // Criando animações do Pacman
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
        this.player.anims.create({
            key: 'pacmanLives',
            frames: scene.anims.generateFrameNames('pacman', {
                frames: [0],
            }),
            frameRate: 1,
            repeat: -1,
        })
        this.player.play('pacmanRight')
    },

    startPosition(x, y) {
        this.player.x = x
        this.player.y = y
        this.player.play('pacmanRight')
        this.direction = RIGHT
        this.nextDirection = RIGHT
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
        return UP
    },
    directionDown() {
        return DOWN
    },
    directionLeft() {
        return LEFT
    },
    directionRight() {
        return RIGHT
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
            if (!tile && !tile2) {
                this.player.x -= VELOCITY
                setTimeout(this.teleportToRight.bind(this), 120)
            } else if (!(tile.collides || tile2.collides)) {
                this.player.x -= VELOCITY
            }
        } else if (this.direction === RIGHT) {
            const tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
            if (!tile && !tile2) {
                this.player.x += VELOCITY
                setTimeout(this.teleportToLeft.bind(this), 120)
            } else if (!(tile.collides || tile2.collides)) {
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
    teleportToLeft() {
        this.player.x = -4
    },
    teleportToRight() {
        this.player.x = 228
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
            if (!tile || !tile2 || tile.collides || tile2.collides) {
                // console.log('Blocked left')
            } else {
                this.faceLeft()
            }
        } else if (this.nextDirection === RIGHT && this.direction !== RIGHT) {
            const tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!tile || !tile2 || tile.collides || tile2.collides) {
                // console.log('Blocked right')
            } else {
                this.faceRight()
            }
        } else if (this.nextDirection === UP && this.direction !== UP) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!tile || !tile2 || tile.collides || tile2.collides) {
                // console.log('Blocked up')
            } else {
                this.faceUp()
            }
        } else if (this.nextDirection === DOWN && this.direction !== DOWN) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!tile || !tile2 || tile.collides || tile2.collides) {
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
    hitGhost() {
        console.log('Hit')
        // Remove imagem das vidas embaixo
        const lifeImage = this.lifeImages.pop()
        lifeImage.destroy()
        this.alive = false
        this.player.play('pacmanDie')
        this.lives -= 1
        if (this.lives === 0) {
            // Game Over
            return true
        }
        return false
    },
    hitFood() {
        this.score += 100
        this.foodEaten += 1
        if (this.playingWalkMusic === false) {
            this.walkMusic.play({
                duration: 0.5506875,
                rate: 1,
                delay: 0,
            })
            this.playingWalkMusic = true
            this.walkMusic.once(
                Phaser.Sound.Events.COMPLETE,
                () => {
                    this.playingWalkMusic = false
                },
                this
            )
        }
    },
    hitPowerup() {
        this.score += 1000
        this.powerup = true
        setTimeout(this.clearPowerup.bind(this), 10000)
    },
    clearPowerup() {
        this.powerup = false
        console.log('Powerup acabou')
    },
    hasWin() {
        if (this.foodEaten >= this.totalFood) return true
        return false
    },
})
