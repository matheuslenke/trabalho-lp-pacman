import Phaser from 'phaser'

//  Direction consts
const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
const VELOCITY = 150

export default new Phaser.Class({
    initialize: function Pacman(scene, x, y) {
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
        // this.body.setCollideWorldBounds(true)

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

    // collideWithFood(food) {
    //     if (this.head.x === food.x && this.head.y === food.y) {
    //         this.grow()

    //         food.eat()

    //         //  For every 5 items of food eaten we'll increase the snake speed a little
    //         if (this.speed > 20 && food.total % 5 === 0) {
    //             this.speed -= 5
    //         }

    //         return true
    //     }

    //     return false
    // },

    // updateGrid(grid) {
    //     //  Remove all body pieces from valid positions list
    //     this.body.children.each((segment) => {
    //         const bx = segment.x / 16
    //         const by = segment.y / 16

    //         // eslint-disable-next-line no-param-reassign
    //         grid[by][bx] = false
    //     })

    //     return grid
    // },
})