import Phaser from 'phaser'
import Fantasma from './Fantasma'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Inky(scene, x, y) {
        // Fantasma Ciano
        this.name = 'Inky'
        this.body = scene.physics.add.sprite(x, y, 'inky').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.direction = this.directionRight();

        this.body.anims.create({
            key: 'inky_right',
            frames: scene.anims.generateFrameNames('inky', {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'inky_left',
            frames: scene.anims.generateFrameNames('inky', {
                start: 2,
                end: 3,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'inky_up',
            frames: scene.anims.generateFrameNames('inky', {
                start: 4,
                end: 5,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'inky_down',
            frames: scene.anims.generateFrameNames('inky', {
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
                this.getBody().play('inky_up');
                break;
            case this.directionDown():
                this.getBody().play('inky_down');
                break;
            case this.directionLeft():
                this.getBody().play('inky_left');
                break;
            case this.directionRight():
                this.getBody().play('inky_right');
                break;
        }
    },

})