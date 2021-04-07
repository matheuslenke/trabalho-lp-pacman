import Phaser from 'phaser'
import Fantasma from './Fantasma'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Pinky(scene, x, y) {
        // Fantasma Rosa
        this.name = 'Pinky'
        this.body = scene.physics.add.sprite(x, y, 'pinky').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.direction = this.directionRight();

        this.body.anims.create({
            key: 'pinky_right',
            frames: scene.anims.generateFrameNames('pinky', {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pinky_left',
            frames: scene.anims.generateFrameNames('pinky', {
                start: 2,
                end: 3,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pinky_up',
            frames: scene.anims.generateFrameNames('pinky', {
                start: 4,
                end: 5,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'pinky_down',
            frames: scene.anims.generateFrameNames('pinky', {
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
                this.getBody().play('pinky_up');
                break;
            case this.directionDown():
                this.getBody().play('pinky_down');
                break;
            case this.directionLeft():
                this.getBody().play('pinky_left');
                break;
            case this.directionRight():
                this.getBody().play('pinky_right');
                break;
        }
    },

})