import Phaser from 'phaser'
import Fantasma from './Fantasma'

//  Direction consts
const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
const VELOCITY = 100
const EATEN = 0
const SCATTER = 1
const CHASE = 2
const FRIGHTENED = 3

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Blinky(scene, x, y) {
        // Fantasma Vermelho
        this.name = 'fantasma'
        this.body = scene.physics.add.sprite(x, y, 'blinky').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.nextDirection = RIGHT
        this.direction = RIGHT

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
        // this.faceRight()
    },

    cycleDirection() {
        switch (this.direction) {
            case UP:
                this.faceLeft()
                break
            case DOWN:
                this.faceRight()
                break
            case LEFT:
                this.faceDown()
                break
            case RIGHT:
                this.faceUp()
                break
        }
    },

    getBody() {
        return this.body
    },

    faceLeft() {
        this.direction = LEFT
        this.body.play('blinky_left')
    },

    faceRight() {
        this.direction = RIGHT
        this.body.play('blinky_right')
    },

    faceUp() {
        this.direction = UP
        this.body.play('blinky_up')
    },

    faceDown() {
        this.direction = DOWN
        this.body.play('blinky_down')
    },
})
