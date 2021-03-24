import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.add.text(100, 100, 'loading fonts...')

    // this.load.image('loaderBg', './assets/images/other/apple.png')

    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })
  }

  update () {
    if (this.fontsReady) {
      this.scene.start('TitleScene')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}