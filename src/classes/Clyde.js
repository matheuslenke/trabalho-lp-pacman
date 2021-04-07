import Phaser from 'phaser'
import Fantasma from './Fantasma'

export default new Phaser.Class({
    Extends: Fantasma,

    initialize: function Clyde(scene, x, y) {
        // Fantasma Amarelo
        this.name = 'Clyde'
        this.body = scene.physics.add.sprite(x, y, 'clyde').setScale(0.5)
        this.body.setDisplaySize(16, 16)
        this.direction = this.directionRight();

        this.body.anims.create({
            key: 'clyde_right',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 0,
                end: 1,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'clyde_left',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 2,
                end: 3,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'clyde_up',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 4,
                end: 5,
            }),
            frameRate: 6,
            repeat: -1,
        })
        this.body.anims.create({
            key: 'clyde_down',
            frames: scene.anims.generateFrameNames('clyde', {
                start: 6,
                end: 7,
            }),
            frameRate: 6,
            repeat: -1,
        })
        // this.faceRight()
    },
    setTarget(pacman) {
        this.target = pacman.getPosition();
    },

    playAnimation(animation) {
        switch (animation) {
            case this.directionUp():
                this.getBody().play('clyde_up');
                break;
            case this.directionDown():
                this.getBody().play('clyde_down');
                break;
            case this.directionLeft():
                this.getBody().play('clyde_left');
                break;
            case this.directionRight():
                this.getBody().play('clyde_right');
                break;
        }
    },

})