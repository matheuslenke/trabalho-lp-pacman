import Phaser from 'phaser'

import FoodImg from '../../assets/images/other/apple.png'
import PacmanSprite from '../../assets/images/pacman.png'

import Map from '../../assets/images/map.png'

import Pacman from '../classes/Pacman'
import Food from '../classes/Food'

let pacman
let platforms

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    preload() {
        this.load.image('food', FoodImg)
        this.load.spritesheet('pacman', PacmanSprite, {
            frameWidth: 26,
            frameHeight: 26,
        })
        this.load.image('map', Map)
    }

    create() {
        this.add.image(300, 400, 'map')

        this.food = new Food(this, 3, 4)

        platforms = this.physics.add.staticGroup()

        platforms.create(400, 568, 'food').setScale(10).refreshBody()

        pacman = new Pacman(this, 15, 8)

        this.physics.add.collider(pacman.getBody(), platforms)
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time, delta) {
        if (!pacman.alive) {
            return
        }
        if (this.cursors.left.isDown) {
            pacman.faceLeft()
            console.log('Facing down')
        } else if (this.cursors.right.isDown) {
            pacman.faceRight()
            console.log('Facing Right')
        } else if (this.cursors.up.isDown) {
            pacman.faceUp()
            console.log('Facing Up')
        } else if (this.cursors.down.isDown) {
            console.log('Facing Down')
            pacman.faceDown()
        }

        // if (this.pacman.update(time))
        // {
        //     //  If the this.pacman updated, we need to check for collision against food

        //     if (this.pacman.collideWithFood(this.food))
        //     {
        //         // repositionFood();
        //     }
        // }
    }

    /**
     * We can place the food anywhere in our 40x30 grid
     * *except* on-top of the snake, so we need
     * to filter those out of the possible food locations.
     * If there aren't any locations left, they've won!
     *
     * @method repositionFood
     * @return {boolean} true if the food was placed, otherwise false
     */
    //  repositionFood ()
    // {
    //     //  First create an array that assumes all positions
    //     //  are valid for the new piece of food

    //     //  A Grid we'll use to reposition the food each time it's eaten
    //     const testGrid = [];

    //     for (var y = 0; y < 30; y++)
    //     {
    //         testGrid[y] = [];

    //         for (var x = 0; x < 40; x++)
    //         {
    //             testGrid[y][x] = true;
    //         }
    //     }

    //     snake.updateGrid(testGrid);

    //     //  Purge out false positions
    //     const validLocations = [];

    //     for (var y = 0; y < 30; y++)
    //     {
    //         for (var x = 0; x < 40; x++)
    //         {
    //             if (testGrid[y][x] === true)
    //             {
    //                 //  Is this position valid for food? If so, add it here ...
    //                 validLocations.push({ x, y });
    //             }
    //         }
    //     }

    //     if (validLocations.length > 0)
    //     {
    //         //  Use the RNG to pick a random food position
    //         const pos = Phaser.Math.RND.pick(validLocations);

    //         //  And place it
    //         food.setPosition(pos.x * 16, pos.y * 16);

    //         return true;
    //     }

    //         return false;

    // }
}