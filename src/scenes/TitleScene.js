import Phaser from 'phaser'
import logoImg from '../../assets/images/ghosts/blinky.png'

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' })
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

        this.add.text(35, 100, 'Pacman', {
            font: '25px Emulogic',
            fill: '#7744ff',
        })

        this.add.text(30, 150, 'Press enter to start', {
            font: '8px Emulogic',
            fill: '#7744ff',
        })

        this.input.keyboard.once(
            'keyup-ENTER',
            function () {
                this.scene.start('GameScene')
            },
            this
        )
    }

    update() {
        // setTimeout(() => {
        //   this.scene.start('GameScene')
        // },3000)
        // this.scene.start('GameScene')
    }
}
