import Pokemon from "./Pokemon";

export default class Charmander extends Pokemon {
  public name: string;
  public level: number;
  public HP: number;
  public attack: number;
  public defense: number;
  public spriteFront: string;
  public spriteBack: string;
  constructor () {
    super()
    this.name = 'Charmander'
    this.level = Math.floor(Math.random() * 5)
    this.HP = 39
    this.attack = 52
    this.defense = 43
    this.spriteFront = 'charmander-front'
    this.spriteBack = 'charmander-back'
  }
  public dealDamage() {
    return Math.floor(Math.random() * 2);
  }
}