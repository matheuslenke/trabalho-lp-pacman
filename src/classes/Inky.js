import Phaser from 'phaser'
import Fantasma from './Fantasma'
import Pacman from './Pacman'
import Blinky from './Blinky'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Inky(scene, x, y) {
        // Fantasma Ciano
        this.name = 'Inky'
        this.body = scene.physics.add.sprite(x, y, 'inky').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.target = { x: 0, y: 0 }
        this.startDirection()
        // this.startChasing();
        this.startLeaveStartArea(20)

        this.body.anims.create({
            key: 'inky_right',
            frames: scene.anims.generateFrameNames('inky', {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'inky_left',
            frames: scene.anims.generateFrameNames('inky', {
                start: 2,
                end: 3,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'inky_up',
            frames: scene.anims.generateFrameNames('inky', {
                start: 4,
                end: 5,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'inky_down',
            frames: scene.anims.generateFrameNames('inky', {
                start: 6,
                end: 7,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'frightened',
            frames: scene.anims.generateFrameNames('inky', {
                start: 8,
                end: 9,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_right',
            frames: scene.anims.generateFrameNames('inky', {
                frames: [10],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_left',
            frames: scene.anims.generateFrameNames('inky', {
                frames: [11],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_up',
            frames: scene.anims.generateFrameNames('inky', {
                frames: [12],
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'dead_down',
            frames: scene.anims.generateFrameNames('inky', {
                frames: [13],
            }),
            frameRate: 6,
            repeat: -1,
        })
        // this.faceRight()
    },
    setTarget(mazeLayer, pacman, inky) {
        switch (this.getState()) {
            case this.stateEaten():
                this.target = { x: 113, y: 140 }
                break
            case this.stateScatter():
                this.target = { x: 220, y: 276 }
                break
            case this.stateChase():
                switch (pacman.getDirection()) {
                    case pacman.directionUp():
                        this.target = {
                            x: pacman.getPosition().x - 1 * 16,
                            y: pacman.getPosition().y - 1 * 16,
                        }
                        break
                    case pacman.directionDown():
                        this.target = {
                            x: pacman.getPosition().x,
                            y: pacman.getPosition().y + 1 * 16,
                        }
                        break
                    case pacman.directionLeft():
                        this.target = {
                            x: pacman.getPosition().x - 1 * 16,
                            y: pacman.getPosition().y,
                        }
                        break
                    case pacman.directionRight():
                        this.target = {
                            x: pacman.getPosition().x + 1 * 16,
                            y: pacman.getPosition().y,
                        }
                        break
                    default:
                        break
                }

                let deslocamento = {
                    x: this.getPosition().x - this.getTarget().x,
                    y: this.getPosition().y - this.getTarget().y,
                }
                this.target = {
                    x: this.getTarget().x - deslocamento.x,
                    y: this.getTarget().y - deslocamento.y,
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
                this.target = { x: 220, y: 276 }
        }
    },

    playAnimation(animation) {
        switch (animation) {
            case this.directionUp():
                this.getBody().play('inky_up')
                break
            case this.directionDown():
                this.getBody().play('inky_down')
                break
            case this.directionLeft():
                this.getBody().play('inky_left')
                break
            case this.directionRight():
                this.getBody().play('inky_right')
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
