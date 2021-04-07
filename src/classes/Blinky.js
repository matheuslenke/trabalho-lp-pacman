import Phaser from 'phaser'
import Fantasma from './Fantasma'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Blinky(scene, x, y) {
        // Fantasma Vermelho
        this.name = 'Blinky'
        this.body = scene.physics.add.sprite(x, y, 'blinky').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.direction = this.directionRight();

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
    setTarget(pacman_position) {
        this.target = pacman_position;
    },

    playAnimation(animation) {
        switch (animation) {
            case this.directionUp():
                this.getBody().play('blinky_up');
                break;
            case this.directionDown():
                this.getBody().play('blinky_down');
                break;
            case this.directionLeft():
                this.getBody().play('blinky_left');
                break;
            case this.directionRight():
                this.getBody().play('blinky_right');
                break;
        }
    },

})