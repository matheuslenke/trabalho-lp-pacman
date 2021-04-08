import Phaser from 'phaser'
import logoImg from '../../assets/images/ghosts/blinky.png'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' })
        this.restart = false
    }

    preload() {
        this.load.image('logo', logoImg)
    }

    create() {
        const logo = this.add.image(400, 150, 'logo')

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            loop: -1,
        })

        this.add.text(50, 50, 'Game Over', {
            font: '14px Emulogic',
            fill: '#7744ff',
        })
        this.add.text(25, 112, 'Press enter to restart', {
            font: '8px Emulogic',
            fill: '#7744ff',
        })
        this.enterKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        )
        this.input.keyboard.once(
            'keyup-ENTER',
            function () {
                this.scene.start('GameScene')
            },
            this
        )
        // this.time.addEvent({
        //     delay: 3000,
        //     loop: false,
        //     callback: () => {
        //         this.scene.start('GameScene', {
        //             gameOver: false,
        //         })
        //     },
        // })
        this.cursors = this.input.keyboard.createCursorKeys
    }

    update() {
        if (this.restart === true) {
            console.log('Restart')
            this.scene.pause()
            this.scene.run('GameScene')
        }
    }
}
