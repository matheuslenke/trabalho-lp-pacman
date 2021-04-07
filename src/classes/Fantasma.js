import Phaser from 'phaser'

// Consts
const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
const VELOCITY = 1
const EATEN = 'eaten'
const SCATTER = 'scatter'
const CHASE = 'chase'
const FRIGHTENED = 'frightened'

export default new Phaser.Class({
    initialize: function Fantasma(scene) {
        // classe base dos fantasmas
        this.state = CHASE
        this.direction = RIGHT
        // this.faceRight();
        this.body
        this.name = 'fantasma'
    },
    getBody() {
        return this.body
    },
    update(mazeLayer, time, delta) {
        const { x, y } = this.body
        if (this.direction === LEFT) {
            const tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.body.x -= VELOCITY
            }
        } else if (this.direction === RIGHT) {
            const tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
            if (!(tile.collides || tile2.collides)) {
                this.body.x += VELOCITY
            }
        } else if (this.direction === UP) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.body.y -= VELOCITY
            }
        } else if (this.direction === DOWN) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.body.y += VELOCITY
            }
        }
        return true
    },

    calculateRoute() {
        let [up_dist, left_dist, down_dist, right_dist] = [99999999, 99999999, 99999999, 99999999];
        const { x, y } = this.getPosition();
        if (!this.directionBlocked(mazeLayer, this.directionRight())) {
            right_dist = this.linearDist({ x: x + 16, y: y }, getTarget());
        }
        if (!this.directionBlocked(mazeLayer, this.directionLeft())) {
            left_dist = this.linearDist({ x: x - 16, y: y }, getTarget());
        }
        if (!this.directionBlocked(mazeLayer, this.directionUp())) {
            up_dist = this.linearDist({ x: x, y: y - 16 }, getTarget());
        }
        if (!this.directionBlocked(mazeLayer, this.directionDown())) {
            down_dist = this.linearDist({ x: x, y: y + 16 }, getTarget());
        }
        let menor_caminho = this.indexOfMin([up_dist, left_dist, down_dist, right_dist]);
        switch (menor_caminho) {
            case 0:
                return UP;
                break;
            case 1:
                return LEFT;
            case 2:
                return DOWN;
            case 3:
                return RIGHT;
            default:
                return this.getDirection();
        }
    },
    getTarget() {
        // return {
        //     x: ,
        //     y:
        // }
    },
    getDirection() {
        return this.direction
    },
    getBody() {
        return this.body
    },
    linearDist(point1, point2) {
        return Phaser.Math.Distance.BetweenPointsSquared({ x: point1.x, y: point1.y }, { x: point2.x, y: point2.y });
    },
    indexOfMin(arr) {
        if (arr.length === 0) {
            return -1
        }

        var min = arr[0]
        var minIndex = 0

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < min) {
                minIndex = i
                min = arr[i]
            }
        }

        return minIndex
    },
    directionUp() {
        return UP;
    },
    directionDown() {
        return DOWN;
    },
    directionLeft() {
        return LEFT;
    },
    directionRight() {
        return RIGHT;
    },
    directionBlocked(mazeLayer, direction) {
        const { x, y } = this.getBody();
        let tile
        let tile2
        switch (direction) {
            case UP:
                if (this.getDirection() == DOWN) {
                    return true;
                }
                tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
                break
            case DOWN:
                if (this.getDirection() == UP) {
                    return true;
                }
                tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
                break
            case LEFT:
                if (this.getDirection() == RIGHT) {
                    return true;
                }
                console.log(`${this.getDirection()}`);
                tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
                break
            case RIGHT:
                if (this.getDirection() == LEFT) {
                    return true;
                }
                tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
                break
            default:
                return true
        }
        return tile.collides || tile2.collides
    },
    getPosition() {
        return { x: this.getBody().x, y: this.getBody().y }
    },

    faceLeft() {
        this.direction = this.directionLeft();
        this.playAnimation(this.directionLeft());
    },

    faceRight() {
        this.direction = this.directionRight();
        this.playAnimation(this.directionRight());
    },

    faceUp() {
        this.direction = this.directionUp();
        this.playAnimation(this.directionUp());
    },

    faceDown() {
        this.direction = this.directionDown();
        this.playAnimation(this.directionDown());
    },

    playAnimation(animation) {},

    getsEaten() {
        if (this.state !== EATEN) {
            if (this.state === FRIGHTENED) {
                this.state = EATEN
            } else {
                alert(`${this.name} was eaten when it was ${this.state}!`)
            }
        }
    },

    getsFrightened() {
        if (this.state !== FRIGHTENED) {
            if (this.state === SCATTER || this.state === CHASE) {
                this.state = FRIGHTENED
            } else {
                alert(`${this.name} got frightened when it was ${this.state}!`)
            }
        }
    },

    startChasing() {
        if (this.state !== CHASE) {
            this.state = CHASE
        }
    },

    startScattering() {
        if (this.state !== SCATTER) {
            this.state = SCATTER
        }
    },
})