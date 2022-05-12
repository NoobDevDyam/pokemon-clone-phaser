import Phaser from "phaser";
export default class BattleUnit {
  constructor(
    public sprite: Phaser.GameObjects.Sprite,
    public id: number
  ){
  }
}