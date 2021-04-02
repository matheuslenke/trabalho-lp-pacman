import Phaser from 'phaser'

//  Direction consts
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
const VELOCITY = 100;
const EATEN = 0;
const SCATTER = 1;
const CHASE = 2;
const FRIGHTENED = 3;

export default new Phaser.Class({

    Extends: Phaser.Class.Fantasma,

    initialize: function Blinky(scene) { // Fantasma Vermelho
        // this.state = CHASE;
        this.name = 'fantasma';
        this.body = scene.physics.add.sprite(250, 600, 'blinky').setScale(3);

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
        //this.direction;
        this.faceRight();
    },

    cycleDirection() {
        switch (this.direction) {
            case UP:
                this.faceLeft();
                break;
            case DOWN:
                this.faceRight();
                break;
            case LEFT:
                this.faceDown();
                break;
            case RIGHT:
                this.faceUp();
                break;
        }
    },

    getBody() {
        return this.body
    },

    faceLeft() {
        if (this.direction !== LEFT) {
            this.direction = LEFT
            this.body.setVelocity(-VELOCITY, 0)
            this.body.play('blinky_left')
        }
    },

    faceRight() {
        if (this.direction !== RIGHT) {
            this.direction = RIGHT
            this.body.setVelocity(VELOCITY, 0)
            this.body.play('blinky_right')
        }
    },

    faceUp() {
        if (this.direction !== UP) {
            this.direction = UP
            this.body.setVelocity(0, -VELOCITY)
            this.body.play('blinky_up')
        }
    },

    faceDown() {
        if (this.direction !== DOWN) {
            this.direction = DOWN
            this.body.setVelocity(0, VELOCITY)
            this.body.play('blinky_down')
        }
    },
})