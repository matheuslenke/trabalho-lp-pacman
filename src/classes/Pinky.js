import Phaser from 'phaser'
import Fantasma from './Fantasma'
import Pacman from './Pacman'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Pinky(scene, x, y) {
        // Fantasma Rosa
        this.name = 'Pinky'
        this.body = scene.physics.add.sprite(x, y, 'pinky').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        // this.startChasing();
        this.startDirection()
        this.target = { x: 0, y: 0 }
        this.startLeaveStartArea(10)
        this.body.anims.create({
            key: 'pinky_right',
            frames: scene.anims.generateFrameNames('pinky', {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pinky_left',
            frames: scene.anims.generateFrameNames('pinky', {
                start: 2,
                end: 3,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pinky_up',
            frames: scene.anims.generateFrameNames('pinky', {
                start: 4,
                end: 5,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pinky_down',
            frames: scene.anims.generateFrameNames('pinky', {
                start: 6,
                end: 7,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'frightened',
            frames: scene.anims.generateFrameNames('pinky', {
                start: 8,
                end: 9,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_right',
            frames: scene.anims.generateFrameNames('pinky', {
                frames: [10],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_left',
            frames: scene.anims.generateFrameNames('pinky', {
                frames: [11],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_up',
            frames: scene.anims.generateFrameNames('pinky', {
                frames: [12],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_down',
            frames: scene.anims.generateFrameNames('pinky', {
                frames: [13],
            }),
            frameRate: 6,
            repeat: -1,
        })
        // this.faceRight()
    },
    setTarget(mazeLayer, pacman) {
        switch (this.getState()) {
            case this.stateEaten():
                this.target = { x: 113, y: 140 }
                break
            case this.stateScatter():
                this.target = { x: 24, y: -8 }
                break
            case this.stateChase():
                switch (pacman.getDirection()) {
                    case pacman.directionUp():
                        this.target = {
                            x: pacman.getPosition().x - 2 * 16,
                            y: pacman.getPosition().y - 2 * 16,
                        }
                        break
                    case pacman.directionDown():
                        this.target = {
                            x: pacman.getPosition().x,
                            y: pacman.getPosition().y + 2 * 16,
                        }
                        break
                    case pacman.directionLeft():
                        this.target = {
                            x: pacman.getPosition().x - 2 * 16,
                            y: pacman.getPosition().y,
                        }
                        break
                    case pacman.directionRight():
                        this.target = {
                            x: pacman.getPosition().x + 2 * 16,
                            y: pacman.getPosition().y,
                        }
                        break
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
                this.target = { x: 24, y: -8 }
        }
    },

    playAnimation(animation) {
        switch (animation) {
            case this.directionUp():
                this.getBody().play('pinky_up')
                break
            case this.directionDown():
                this.getBody().play('pinky_down')
                break
            case this.directionLeft():
                this.getBody().play('pinky_left')
                break
            case this.directionRight():
                this.getBody().play('pinky_right')
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
    startDirection() {
        this.direction = this.directionRight()
        this.nextDirection = this.directionRight()
    },
})
