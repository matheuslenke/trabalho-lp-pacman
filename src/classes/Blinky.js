import Phaser from 'phaser'
import Fantasma from './Fantasma'
import Pacman from './Pacman'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Blinky(scene, x, y) {
        // Fantasma Vermelho
        this.name = 'Blinky'
        this.body = scene.physics.add.sprite(x, y, 'blinky').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.body.x = x
        this.body.y = y
        this.target = { x: 0, y: 0 }
        this.direction = this.directionRight()
        // this.startChasing();
        this.startLeaveStartArea(6)
        //this.getsFrightened();
        //this.getsEaten();
        this.body.anims.create({
            key: 'blinky_right',
            frames: scene.anims.generateFrameNames('blinky', {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'blinky_left',
            frames: scene.anims.generateFrameNames('blinky', {
                start: 2,
                end: 3,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'blinky_up',
            frames: scene.anims.generateFrameNames('blinky', {
                start: 4,
                end: 5,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'blinky_down',
            frames: scene.anims.generateFrameNames('blinky', {
                start: 6,
                end: 7,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'frightened',
            frames: scene.anims.generateFrameNames('blinky', {
                start: 8,
                end: 9,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_right',
            frames: scene.anims.generateFrameNames('blinky', {
                frames: [10],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_left',
            frames: scene.anims.generateFrameNames('blinky', {
                frames: [11],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_up',
            frames: scene.anims.generateFrameNames('blinky', {
                frames: [12],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_down',
            frames: scene.anims.generateFrameNames('blinky', {
                frames: [13],
            }),
            frameRate: 6,
            repeat: -1,
        })
    },
    setTarget(mazeLayer, pacman) {
        switch (this.getState()) {
            case this.stateLeavingHouse():
                this.target = { x: 116, y: 116 }
                break
            case this.stateEaten():
                this.target = { x: 112, y: 124 }
                break
            case this.stateScatter():
                this.target = { x: 200, y: -8 }
                break
            case this.stateChase():
                this.target = pacman.getPosition()
                break
            case this.stateFrightened():
                this.target = { x: 112, y: 116 }
                let directions_not_blocked = []
                if (!this.directionBlocked(mazeLayer, this.directionUp())) {
                    directions_not_blocked.push(this.directionUp())
                }
                if (!this.directionBlocked(mazeLayer, this.directionLeft())) {
                    directions_not_blocked.push(this.directionLeft())
                }
                if (!this.directionBlocked(mazeLayer, this.directionDown())) {
                    directions_not_blocked.push(this.directionDown())
                }
                if (!this.directionBlocked(mazeLayer, this.directionRight())) {
                    directions_not_blocked.push(this.directionRight())
                }
                this.nextDirection = this.getRandomDirectionFromArray(
                    directions_not_blocked
                )
                break
            default:
                this.target = { x: 0, y: 0 }
        }
    },

    playAnimation(animation) {
        switch (animation) {
            case this.directionUp():
                this.getBody().play('blinky_up')
                break
            case this.directionDown():
                this.getBody().play('blinky_down')
                break
            case this.directionLeft():
                this.getBody().play('blinky_left')
                break
            case this.directionRight():
                this.getBody().play('blinky_right')
                break
            case this.stateFrightened():
                this.getBody().play('frightened')
                break
            case this.stateEaten():
                switch (this.getDirection()) {
                    case this.directionUp():
                        this.getBody().play('dead_up')
                        break
                    case this.directionDown():
                        this.getBody().play('dead_down')
                        break
                    case this.directionLeft():
                        this.getBody().play('dead_left')
                        break
                    case this.directionRight():
                        this.getBody().play('dead_right')
                        break
                }
                break
        }
    },
    leaveStartArea(mazeLayer) {
        // console.log(this.timeCounter)
        const { x, y } = this.getPosition()
        if (this.bouncingTimes === this.maxBouncingTimes) {
            // console.log('Acabou')
            if (x === 113) {
                this.faceUp()
            }
            if (y === 116) {
                this.faceRight()
                this.startChasing()
            }
        } else if (this.getDirection() === this.directionRight()) {
            const tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
            if (tile.collides || tile2.collides) {
                this.faceLeft()
                this.bouncingTimes += 1
            }
        } else if (this.getDirection() === this.directionLeft()) {
            const tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
            if (tile.collides || tile2.collides) {
                this.faceRight()
                this.bouncingTimes += 1
            }
        }
    },
})
