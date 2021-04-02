import Phaser from 'phaser'

//  Direction consts
const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
const VELOCITY = 150

export default new Phaser.Class({
    initialize: function Pacman(scene) {
        this.alive = true

        this.body = scene.physics.add.sprite(250, 400, 'pacman')

        this.body.anims.create({
            key: 'pacmanDown',
            frames: scene.anims.generateFrameNames('pacman', {
                start: 0,
                end: 2,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pacmanLeft',
            frames: scene.anims.generateFrameNames('pacman', {
                start: 3,
                end: 5,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pacmanRight',
            frames: scene.anims.generateFrameNames('pacman', {
                start: 6,
                end: 8,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pacmanUp',
            frames: scene.anims.generateFrameNames('pacman', {
                start: 9,
                end: 11,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.direction;
        this.faceRight();
    },

    getBody() {
        return this.body
    },

    faceLeft() {
        if (this.direction !== LEFT) {
            this.direction = LEFT
            this.body.setVelocity(-VELOCITY, 0)
            this.body.play('pacmanLeft')
        }
    },

    faceRight() {
        if (this.direction !== RIGHT) {
            this.direction = RIGHT
            this.body.setVelocity(VELOCITY, 0)
            this.body.play('pacmanRight')
        }
    },

    faceUp() {
        if (this.direction !== UP) {
            this.direction = UP
            this.body.setVelocity(0, -VELOCITY)
            this.body.play('pacmanUp')
        }
    },

    faceDown() {
        if (this.direction !== DOWN) {
            this.direction = DOWN
            this.body.setVelocity(0, VELOCITY)
            this.body.play('pacmanDown')
        }
    },
})