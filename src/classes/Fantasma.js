import Phaser from 'phaser'

//  Direction consts
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
const VELOCITY = 150;
const EATEN = 0;
const SCATTER = 1;
const CHASE = 2;
const FRIGHTENED = 3;

export default new Phaser.Class({

    initialize: function Fantasma(scene) { // classe base dos fantasmas

        this.state = CHASE;
        this.direction = RIGHT;
        this.faceRight();
        this.body;
        this.name = 'fantasma';
    },
    getBody() {
        return this.body;
    },

    calculateTarget() {},
    getTarget() {},
    linearDist() {},
    directionBlocked() {},
    getPosition() {},

    determineDirection() {
        switch (this.direction) {
            case UP:
                if (this.directionBlocked(UP)) {
                    break;
                } else {
                    this.linearDist(getPosition(), getTarget());
                }
                break;
            case DOWN:
                if (this.directionBlocked(DOWN)) {
                    break;
                } else {
                    this.linearDist(getPosition(), getTarget());
                }
                break;
            case LEFT:
                if (this.directionBlocked(LEFT)) {
                    break;
                } else {
                    this.linearDist(getPosition(), getTarget());
                }
                break;
            case RIGHT:
                if (this.directionBlocked(RIGHT)) {
                    break;
                } else {
                    this.linearDist(getPosition(), getTarget());
                }
                break;
            default:
        }
    },

    getsEaten() {
        if (this.state !== EATEN) {
            if (this.state === FRIGHTENED) {
                this.state = EATEN;
            } else {
                alert(`${this.name} was eaten when it was ${this.state}!`);
            }
        }
    },

    getsFrightened() {
        if (this.state !== FRIGHTENED) {
            if (this.state === SCATTER || this.state === CHASE) {
                this.state = FRIGHTENED;
            } else {
                alert(`${this.name} got frightened when it was ${this.state}!`);
            }
        }
    },

    startChasing() {
        if (this.state !== CHASE) {
            this.state = CHASE;
        }
    },

    startScattering() {
        if (this.state !== SCATTER) {
            this.state = SCATTER;
        }
    },

    faceLeft() {
        if (this.direction !== LEFT) {
            this.direction = LEFT
            this.body.setVelocity(-VELOCITY, 0)
            //this.body.play('pacmanLeft')
        }
    },

    faceRight() {
        if (this.direction !== RIGHT) {
            this.direction = RIGHT
            this.body.setVelocity(VELOCITY, 0)
            //this.body.play('pacmanRight')
        }
    },

    faceUp() {
        if (this.direction !== UP) {
            this.direction = UP
            this.body.setVelocity(0, -VELOCITY)
            //this.body.play('pacmanUp')
        }
    },

    faceDown() {
        if (this.direction !== DOWN) {
            this.direction = DOWN
            this.body.setVelocity(0, VELOCITY)
            //this.body.play('pacmanDown')
        }
    },
})