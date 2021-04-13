import Phaser from 'phaser'
import Fantasma from './Fantasma'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Clyde(scene, x, y) {
        // Fantasma Amarelo
        this.name = 'Clyde'
        this.body = scene.physics.add.sprite(x, y, 'clyde').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.body.setSize(6, 6)
        this.body.x = x
        this.body.y = y
        this.startDirection()
        // this.startChasing();
        this.target = { x: 0, y: 0 }
        this.startLeaveStartArea(15)
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
        this.body.anims.create({
            key: 'frightened',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 8,
                end: 9,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_right',
            frames: scene.anims.generateFrameNames('clyde', {
                frames: [10],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_left',
            frames: scene.anims.generateFrameNames('clyde', {
                frames: [11],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_up',
            frames: scene.anims.generateFrameNames('clyde', {
                frames: [12],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_down',
            frames: scene.anims.generateFrameNames('clyde', {
                frames: [13],
            }),
            frameRate: 6,
            repeat: -1,
        })
    },
    setTarget(mazeLayer, pacman) {
        switch (this.getState()) {
            case this.stateEaten():
                this.target = { x: 113, y: 140 }
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
})
