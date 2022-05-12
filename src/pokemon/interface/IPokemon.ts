export default interface IPokemon {
  name: string;
  level: number;
  HP: number;
  attack: number;
  defense: number;
  spriteFront: string;
  spriteBack: string;
  exp: number;
  id: number;
  levelUp: () => void
  dealDamage:  () => void
}