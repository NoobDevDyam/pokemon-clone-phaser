import Pokemon from "./Pokemon";


export default class Squirtle extends Pokemon {
  public name: string;
  public level: number;
  public HP: number;
  public attack: number;
  public defense: number;
  public spriteFront: string;
  public spriteBack: string;
  constructor () {
    super()
    this.name = 'Squirtle'
    this.level = Math.floor(Math.random() * 5)
    this.HP = 44
    this.attack = 48
    this.defense = 65
    this.spriteFront = 'squirtle-front'
    this.spriteBack = 'squirtle-back'
  }
  public dealDamage() {
    return Math.floor(Math.random() * 2);
  }
}