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
        this.state = CHASE;
        this.direction = this.directionUp();
        this.nextDirection = this.directionRight();
        // this.faceRight();
        this.body;
        this.target = { x: 0, y: 0 };
        this.name = 'Fantasma'
    },
    getBody() {
        return this.body
    },
    update(mazeLayer, time, delta) {
        const { x, y } = this.body
        if (this.nextDirection === LEFT) {
            const tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.faceLeft();
                this.body.x -= VELOCITY;
            }
        } else if (this.nextDirection === RIGHT) {
            const tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
            if (!(tile.collides || tile2.collides)) {
                this.faceRight();
                this.body.x += VELOCITY;
            }
        } else if (this.nextDirection === UP) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.faceUp();
                this.body.y -= VELOCITY;
            }
        } else if (this.nextDirection === DOWN) {
            const tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
            const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
            // console.log('Tile 1', tile, 'Tile2', tile2)
            if (!(tile.collides || tile2.collides)) {
                this.faceDown();
                this.body.y += VELOCITY;
            }
        }
        return true
    },
    setTarget() {
        return {
            x: 0,
            y: 0
        }
    },
    getTarget() {
        return this.target;
    },

    calculateRoute(mazeLayer) {
        if (this.getState() !== this.stateFrightened()) {
            let [up_dist, left_dist, down_dist, right_dist] = [99999999, 99999999, 99999999, 99999999];
            const { x, y } = this.getPosition();
            if (!this.directionBlocked(mazeLayer, this.directionRight())) {
                right_dist = this.linearDist({ x: x + 16, y: y }, this.getTarget());
            }
            if (!this.directionBlocked(mazeLayer, this.directionLeft())) {
                left_dist = this.linearDist({ x: x - 16, y: y }, this.getTarget());
            }
            if (!this.directionBlocked(mazeLayer, this.directionUp())) {
                up_dist = this.linearDist({ x: x, y: y - 16 }, this.getTarget());
            }
            if (!this.directionBlocked(mazeLayer, this.directionDown())) {
                down_dist = this.linearDist({ x: x, y: y + 16 }, this.getTarget());
            }
            let menor_caminho = this.indexOfMin([up_dist, left_dist, down_dist, right_dist]);
            switch (menor_caminho) {
                case 0:
                    this.nextDirection = this.directionUp();
                    break;
                case 1:
                    this.nextDirection = this.directionLeft();
                    break;
                case 2:
                    this.nextDirection = this.directionDown();
                    break;
                case 3:
                    this.nextDirection = this.directionRight();
                    break;
                default:
                    return this.getDirection();
            }
        }
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
    stateEaten() {
        return EATEN;
    },
    stateScatter() {
        return SCATTER;
    },
    stateChase() {
        return CHASE;
    },
    stateFrightened() {
        return FRIGHTENED;
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

    getDirection() {
        return this.direction;
    },

    getBody() {
        return this.body;
    },

    getState() {
        return this.state;
    },

    faceLeft() {
        if (this.getDirection() != this.directionLeft()) {
            this.direction = this.directionLeft();
            switch (this.getState()) {
                case this.stateEaten():
                    this.playAnimation(this.stateEaten());
                    break;
                case this.stateChase():
                    this.playAnimation(this.directionLeft());
                    break;
                case this.stateScatter():
                    this.playAnimation(this.directionLeft());
                    break;
                case this.stateFrightened():
                    this.playAnimation(this.stateFrightened());
                    break;
            }
        }
    },

    faceRight() {
        if (this.getDirection() != this.directionRight()) {
            this.direction = this.directionRight();
            switch (this.getState()) {
                case this.stateEaten():
                    this.playAnimation(this.stateEaten());
                    break;
                case this.stateChase():
                    this.playAnimation(this.directionRight());
                    break;
                case this.stateScatter():
                    this.playAnimation(this.directionRight());
                    break;
                case this.stateFrightened():
                    this.playAnimation(this.stateFrightened());
                    break;
            }
        }
    },

    faceUp() {
        if (this.getDirection() != this.directionUp()) {
            this.direction = this.directionUp();
            switch (this.getState()) {
                case this.stateEaten():
                    this.playAnimation(this.stateEaten());
                    break;
                case this.stateChase():
                    this.playAnimation(this.directionUp());
                    break;
                case this.stateScatter():
                    this.playAnimation(this.directionUp());
                    break;
                case this.stateFrightened():
                    this.playAnimation(this.stateFrightened());
                    break;
            }
        }
    },

    faceDown() {
        if (this.getDirection() != this.directionDown()) {
            this.direction = this.directionDown();
            switch (this.getState()) {
                case this.stateEaten():
                    this.playAnimation(this.stateEaten());
                    break;
                case this.stateChase():
                    this.playAnimation(this.directionDown());
                    break;
                case this.stateScatter():
                    this.playAnimation(this.directionDown());
                    break;
                case this.stateFrightened():
                    this.playAnimation(this.stateFrightened());
                    break;
            }
        }
    },

    playAnimation(animation) {},

    getsEaten() {
        if (this.state !== EATEN) {
            this.state = EATEN
        }
    },

    getsFrightened() {
        if (this.state !== FRIGHTENED) {
            this.state = FRIGHTENED
            this.turnAround();
        }
    },
    turnAround() {
        switch (this.getDirection()) {
            case this.directionUp():
                this.faceDown();
                break;
            case this.directionDown():
                this.faceUp();
                break;
            case this.directionLeft():
                this.faceRight();
                break;
            case this.directionRight():
                this.faceLeft();
                break;
        }
    },

    getRandomDirectionFromArray(directions) {
        return Phaser.Math.RND.pick(directions);
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