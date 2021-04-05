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

    calculateTarget() {},
    getTarget() {},
    getDirection() {
        return this.direction
    },
    linearDist(point1, point2) {},
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
    directionBlocked(mazeLayer, position, direction) {
        const { x, y } = position
        let tile
        let tile2
        switch (direction) {
            case UP:
                tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
                break
            case DOWN:
                tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
                break
            case LEFT:
                tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
                break
            case RIGHT:
                tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
                tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
                break
            default:
                return true
        }
        return tile.collides || tile2.collides
    },
    getPosition() {
        return { x: this.body.x, y: this.body.y }
    },

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

    canFaceLeft(mazeLayer) {
        if (this.direction === RIGHT) {
            return false
        }
        const { x, y } = this.body
        const tile = mazeLayer.getTileAtWorldXY(x - 5, y - 4, true)
        const tile2 = mazeLayer.getTileAtWorldXY(x - 5, y + 3, true)
        // console.log('Tile 1', tile, 'Tile2', tile2)
        if (tile.collides || tile2.collides) {
            return false
        }
        return true
    },
    canFaceRight(mazeLayer) {
        if (this.direction === LEFT) {
            return false
        }
        const { x, y } = this.body
        const tile = mazeLayer.getTileAtWorldXY(x + 4, y - 4, true)
        const tile2 = mazeLayer.getTileAtWorldXY(x + 4, y + 3, true)
        // console.log('Tile 1', tile, 'Tile2', tile2)
        if (tile.collides || tile2.collides) {
            return false
        }
        return true
    },
    canFaceUp(mazeLayer) {
        if (this.direction === DOWN) {
            return false
        }
        const { x, y } = this.body
        const tile = mazeLayer.getTileAtWorldXY(x - 4, y - 5, true)
        const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y - 5, true)
        // console.log('Tile 1', tile, 'Tile2', tile2)
        if (tile.collides || tile2.collides) {
            return false
        }
        return true
    },
    canFaceDown(mazeLayer) {
        if (this.direction === UP) {
            return false
        }
        const { x, y } = this.body
        const tile = mazeLayer.getTileAtWorldXY(x - 4, y + 4, true)
        const tile2 = mazeLayer.getTileAtWorldXY(x + 3, y + 4, true)
        // console.log('Tile 1', tile, 'Tile2', tile2)
        if (tile.collides || tile2.collides) {
            return false
        }
        return true
    },
})
