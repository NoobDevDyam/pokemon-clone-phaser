import Phaser from 'phaser';
import Battle from './Battle';

export default class Game extends Phaser.Scene {

  public music: any
  public player: Phaser.GameObjects.Sprite | any
  
  constructor() {
    super('Overworld');
  }

  preload() {
    this.load.spritesheet('player', 'assets/player/gabe-idle-run.png', {
      frameWidth: 24,
      frameHeight: 23
    })

    this.load.audio('bg-music', 'assets/Celestial.mp3')


  }

  create() {
    this.music = this.sound.add('bg-music', {loop: true} )

    // set volume so it's not way too dank
    this.sound.volume = 0.3

    // play bgm
    this.music.play()

    // add player
    this.player = this.createPlayer()

  }

  
  update(){
    this.movePlayer()
  }

  // we declare all player animations here
  // we also create the player here, this function returns the player sprite and gameobject
  createPlayer() {
    const player = this.add.sprite(50, 50, 'player', 1).setScale(2)
    this.physics.add.existing(player)

    this.anims.create(
      {
        key: 'player-run',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
      }
    )
    return player
  }

  movePlayer() {
    let isLeft = false
    let isWalking = false
    const cursors = this.input.keyboard.createCursorKeys();
    if(cursors.left.isDown) {
      isLeft = true
      isWalking = true
      this.player.x -= 5;
      this.player.anims.play('player-run', true)
    } else if (cursors.right.isDown) {
      isLeft = false
      isWalking = true
      this.player.x += 5;
      this.player.anims.play('player-run', true)
    } else if (cursors.up.isDown) {
      isWalking = true
      this.player.y -= 5;
      this.player.anims.play('player-run', true)
    } else if (cursors.down.isDown) {
      isWalking = true
      this.player.y += 5;
      this.player.anims.play('player-run', true)
    } else {
      isWalking = false
      this.player.anims.stop()
    }

    if (isLeft){
      this.player.flipX = true
    } else {
      this.player.flipX = false
    }

    if (isWalking) {
      this.checkEncounters()
    }
  }

  checkEncounters() {
    const chance = Math.floor(Math.random() * 100);
    if (chance === 1) {
      this.music.stop()
      this.scene.run('Battle')
      this.scene.pause()
      console.log("encountered pokemon")
    }
  }

}
