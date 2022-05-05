import Pokemon from "./Pokemon";

export default class Bulbasaur extends Pokemon {
  public name: string;
  public level: number;
  public HP: number;
  public attack: number;
  public defense: number;
  public spriteFront: string;
  public spriteBack: string;
  constructor () {
    super()
    this.name = 'Bulbasaur'
    this.level = Math.floor(Math.random() * 5)
    this.HP = 45
    this.attack = 49
    this.defense = 49
    this.spriteFront = 'bulbasaur-front'
    this.spriteBack = 'bulbasaur-back'
  }

  public dealDamage() {
    return Math.floor(Math.random() * 2);
  }
}
  