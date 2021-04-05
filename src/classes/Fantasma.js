import Phaser from 'phaser'

// Consts
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
const VELOCITY = 1;
const EATEN = 'eaten';
const SCATTER = 'scatter';
const CHASE = 'chase';
const FRIGHTENED = 'frightened';

export default new Phaser.Class({

    initialize: function Fantasma(scene) { // classe base dos fantasmas

        this.state = CHASE;
        this.direction = RIGHT;
        // this.faceRight();
        this.body;
        this.name = 'fantasma';
    },
    getBody() {
        return this.body;
    },

    calculateTarget() {},
    getTarget() {},
    getDirection() {
        return this.direction;
    },
    linearDist(point1, point2) {},
    indexOfMin(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var min = arr[0];
        var minIndex = 0;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < min) {
                minIndex = i;
                min = arr[i];
            }
        }

        return minIndex;
    },
    directionBlocked(mazeLayer, position, direction) {
        const { x, y } = position;
        let tile, tile2;
        switch (direction) {
            case UP:
                tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
                break;
            case DOWN:
                tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
                break;
            case LEFT:
                tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
                break;
            case RIGHT:
                tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
                break;
            default:
                return true;
        }
        return (tile.collides || tile2.collides);
    },
    getPosition() {
        return { x: this.body.x, y: this.body.y };
    },

    update(mazeLayer) {
        // const { x, y } = this.getPosition();
        // const target = this.getTarget();
        // let [up_dist, down_dist, left_dist, right_dist] = [99999, 99999, 99999, 99999];
        // if (!this.directionBlocked(mazeLayer, { x, y }, UP)) {
        //     up_dist = this.linearDist([x, y - 16], target);
        // }
        // if (!this.directionBlocked(mazeLayer, { x, y }, DOWN)) {
        //     down_dist = this.linearDist([x, y + 16], target);
        // }
        // if (!this.directionBlocked(mazeLayer, { x, y }, LEFT)) {
        //     left_dist = this.linearDist([x - 16, y], target);
        // }
        // if (!this.directionBlocked(mazeLayer, { x, y }, RIGHT)) {
        //     right_dist = this.linearDist([x + 16, y], target);
        // }
        // switch (this.indexOfMin([up_dist, down_dist, left_dist, right_dist])) {
        //     case UP:
        //         this.faceUp();
        //         break;
        //     case DOWN:
        //         this.faceDown();
        //         break;
        //     case LEFT:
        //         this.faceLeft();
        //         break;
        //     case RIGHT:
        //         this.faceRight();
        //         break;
        // }
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
            this.body.x -= VELOCITY;
            //this.body.play('pacmanLeft')
        }
    },

    faceRight() {
        if (this.direction !== RIGHT) {
            this.direction = RIGHT
            this.body.x += VELOCITY;
            //this.body.play('pacmanRight')
        }
    },

    faceUp() {
        if (this.direction !== UP) {
            this.direction = UP
            this.body.y -= VELOCITY;
            //this.body.play('pacmanUp')
        }
    },

    faceDown() {
        if (this.direction !== DOWN) {
            this.direction = DOWN
            this.body.y += VELOCITY;
            //this.body.play('pacmanDown')
        }
    },
})