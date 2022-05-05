import Phaser from 'phaser';
import Bulbasaur from '../pokemon/Bulbasaur';
import Charmander from '../pokemon/Charmander';
import Pokemon from '../pokemon/Pokemon';
import Squirtle from '../pokemon/Squirtle';
import Player from '../pokemon/Player';
import HPBar from '../UI/HPBar';
import BattleUnit from '../UI/BattleUnit';

export default class Battle extends Phaser.Scene {

  public music: any
  public player: Phaser.GameObjects.Image | any
  public enemies: BattleUnit[];
  public enemiesData: Pokemon[];
  public enemyBar: HPBar[];
  public playerHpBar: Phaser.GameObjects.Rectangle | any;
  public playerData: Player;
  
  constructor() {
    super('Battle');
    this.enemiesData = []
    this.playerData = new Player()
    this.enemyBar = []
    this.enemies = []
  }

  preload() {
    this.load.image('bulbasaur-front', 'assets/Pokemon/Bulbasaur/bulbasaur_front.png')
    this.load.image('bulbasaur-back', 'assets/Pokemon/Bulbasaur/bulbasaur_back.png')
    this.load.image('charmander-front', 'assets/Pokemon/Charmander/charmander_front.png')
    this.load.image('charmander-back', 'assets/Pokemon/Charmander/charmander_back.png')
    this.load.image('squirtle-front', 'assets/Pokemon/Squirtle/squirtle_front.png')
    this.load.image('squirtle-back', 'assets/Pokemon/Squirtle/squirtle_back.png')
    this.load.audio('bg-music', 'assets/The Arrival (BATTLE II).mp3')

  }

  create() {
    this.music = this.sound.add('bg-music', {loop: true} )

    // set volume so it's not way too dank
    this.sound.volume = 0.3

    // play bgm
    this.music.play()

    // add enemies
    this.enemiesData = this.createEnemies()
    this.enemies = this.createEnemyGroup(this.enemiesData)

    //add player
    this.player = this.add.image(400,500, this.playerData.spriteBack).setScale(5) 

    //enemy stats
    this.addNameTexts()
    this.addLevelTexts()
    this.enemyBar = this.addHpBar()


    //player stats
    this.addPlayerStats()
    this.addPlayerHpBar()

    //add attack btn
    this.addAttackBtn()
    this.addFleeBtn()
  }

  addPlayerHpBar() {
    this.playerHpBar = this.add.rectangle(550, 540, (this.playerData.HP / 100) * 150, 10, 0xff0000).setOrigin(0.5)
  }
  addPlayerStats() {
    this.add.text(550, 500, this.playerData.name).setOrigin(0.5)
    this.add.text(550, 520, `Level: ${this.playerData.level}`).setOrigin(0.5)
  }

  addNameTexts() {
    //add enemy stats
    let x = 0;
    let y = 50;
    for (const enemy of this.enemiesData) {
      x+= 120
      this.add.text(x, y, enemy.name).setOrigin(0.5)
    }
  }

  addLevelTexts() {
    //add enemy stats
    let x = 0;
    let y = 150;
    for (const enemy of this.enemiesData) {
      x+= 120
      this.add.text(x, y, `Level: ${enemy.level}`).setOrigin(0.5)
    }
  }

  addHpBar() {
    //add enemy stats
    let x = 0;
    let y = 170;
    const hpBars = []
    for (const enemy of this.enemiesData) {
      let width = (enemy.HP / 100) * 150
      x+= 120
      const hpBar = this.add.rectangle(x, y, width, 10, 0xff0000).setOrigin(0.5)
      hpBars.push(new HPBar(hpBar, enemy.id))
    }
    return hpBars
  }

  addAttackBtn() {
    const attackBtn = this.add.text(200, 500, 'Attack!', { color: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => this.attack() );
  }
  addFleeBtn() {
    const attackBtn = this.add.text(200, 550, 'Flee!', { color: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => this.Flee() );
  }

  attack() {
    let lowestHp = this.enemiesData[0]
    for (let i = 0; i < this.enemiesData.length ; i++) {
      if (lowestHp.HP > this.enemiesData[i].HP) {
        lowestHp = this.enemiesData[i]
      }
      if (lowestHp.HP > 0) {
        lowestHp.HP -= this.playerData.dealDamage()
      } else if (lowestHp.HP <= 0) {
        lowestHp.HP = 0
      }
    }


    console.log(lowestHp)

    
    
    if (lowestHp.HP === 0) {
      for (const enemy of this.enemiesData) {
        if (lowestHp.id === enemy.id) {
          this.enemiesData.splice(this.enemiesData.indexOf(enemy), 1)
        }
        
      }
      for (let i = 0; i < this.enemies.length; i++) {
        if (lowestHp.id = this.enemies[i].id) {
          this.enemies[i].sprite.destroy()
        }
      }
    }

    this.playerTakeDamage()
    
    console.log(lowestHp.HP)
    console.log(this.enemiesData)
  }

  playerTakeDamage() {
    for (const enemy of this.enemiesData) {
      if (this.playerData.HP > 0) {
        this.playerData.HP -= enemy.dealDamage()
      }
    }
  }


  
  update(){
    this.updateHpBars()

    if (this.enemiesData.length === 0) {
      this.Flee()
    }
  }

  Flee() {
    this.music.stop()
    this.scene.stop()
    this.scene.resume('Overworld')
  }


  // TODO: Fix Bug where hpBars are not updating correctly
  updateHpBars() {
    this.playerHpBar.width = (this.playerData.HP / 100) * 150
    const hps = []
    for (const enemy of this.enemiesData) {
      hps.push({
        HP: enemy.HP,
        id: enemy.id
      })
    }
    for (let i = 0; i < this.enemyBar.length; i++) {
      if (this.enemyBar[i].id === hps[i].id) {
        let width = (hps[i]["HP"] / 100) * 150
        this.enemyBar[i].hpbar.width = width
      }
    }
  }

  
  createEnemies() {
    const Enemies : Pokemon[] = []
    for (let i = 0; i < 3; i++) {
      const rand = Math.floor(Math.random() * 3)
      switch (rand) {
        case 0:
          Enemies.push(new Bulbasaur())
          break
        case 1:
          Enemies.push(new Charmander())
          break
        case 2:
          Enemies.push(new Squirtle())
          break
      }
    }
    
    return Enemies
  }

  createEnemyGroup(enemies : Pokemon[]) {
    let x = 50;
    let y = 100;
    const enemyGroup : BattleUnit[] = []
    for (const enemy of enemies) {
      x += 100
      const pokemonEnemy = this.add.sprite(x, y, enemy.spriteFront).setScale(2)
      enemyGroup.push(new BattleUnit(pokemonEnemy, enemy.id))
    }
    console.log(enemies)
    return enemyGroup
  }

}
