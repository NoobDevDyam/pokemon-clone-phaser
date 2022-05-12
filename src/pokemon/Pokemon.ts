import IPokemon from "./interface/IPokemon";
export default class Pokemon implements IPokemon{
  
  public id: number
  public name: string
  public level: number
  public HP: number
  public attack: number
  public defense: number
  public spriteFront: string
  public spriteBack: string
  public exp: number
  constructor (
    
  ){
    this.name = ''
    this.level = 0
    this.HP = 0
    this.attack = 0
    this.defense = 0
    this.spriteBack = ''
    this.spriteFront = ''
    this.exp = 0
    this.id = Math.random() * 10
  }
  

  public levelUp() {
    if (this.exp === 100) {
      this.level += 1;
      this.exp = 0;
    }
  }

  public dealDamage() {
    return Math.floor((this.attack * this.level) / 100 + 5);
  }
}