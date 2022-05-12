import Phaser from 'phaser';
import config from './config';
import Overworld from './scenes/Overworld';
import Battle from './scenes/Battle';

new Phaser.Game(
  Object.assign(config, {
    scene: [Overworld, Battle]
  })
);
