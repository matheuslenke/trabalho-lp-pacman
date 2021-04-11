import Phaser from 'phaser'
import Fantasma from './Fantasma'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Clyde(scene, x, y) {
        // Fantasma Amarelo
        this.name = 'Clyde'
        this.body = scene.physics.add.sprite(x, y, 'clyde').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.body.x = x
        this.body.y = y
        // this.startChasing();
        this.target = { x: 0, y: 0 }
        this.direction = this.directionUp()
        this.startLeaveStartArea(15)
        this.faceRight()
        this.body.anims.create({
            key: 'clyde_right',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'clyde_left',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 2,
                end: 3,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'clyde_up',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 4,
                end: 5,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'clyde_down',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 6,
                end: 7,
            }),
            frameRate: 6,
            repeat: -1,
        })
    },
    setTarget(mazeLayer, pacman) {
        switch (this.getState()) {
            case this.stateEaten():
                break
            case this.stateScatter():
                this.target = { x: 4, y: 276 }
                break
            case this.stateChase():
                if (
                    this.linearDist(this.getPosition(), pacman.getPosition()) >=
                    64 * 64
                ) {
                    this.target = pacman.getPosition()
                } else {
                    this.target = { x: 4, y: 276 }
                }
                break
            case this.stateFrightened():
                break
            default:
                this.target = { x: 4, y: 276 }
        }
    },

    playAnimation(animation) {
        switch (animation) {
            case this.directionUp():
                this.getBody().play('clyde_up')
                break
            case this.directionDown():
                this.getBody().play('clyde_down')
                break
            case this.directionLeft():
                this.getBody().play('clyde_left')
                break
            case this.directionRight():
                this.getBody().play('clyde_right')
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
                this.faceLeft()
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