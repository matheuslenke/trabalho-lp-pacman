import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {
        this.fontsReady = false
        this.fontsLoaded = this.fontsLoaded.bind(this)
        this.add.text(80, 60, 'loading fonts...')

        WebFont.load({
            custom: {
                families: ['Emulogic'],
            },
            active: this.fontsLoaded,
        })
    }

    update() {
        if (this.fontsReady) {
            this.scene.start('TitleScene')
        }
    }

    fontsLoaded() {
        this.fontsReady = true
    }
}
