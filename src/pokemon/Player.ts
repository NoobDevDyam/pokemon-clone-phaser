import Pokemon from "./Pokemon";

export default class Player extends Pokemon {
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
    this.level = 7
    this.HP = 44
    this.attack = 48
    this.defense = 65
    this.spriteFront = 'squirtle-front'
    this.spriteBack = 'squirtle-back'
  }
}