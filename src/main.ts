import { Game, Types } from 'phaser';
import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { InteractionUi } from './scenes/InteractionUi';
import { Intro } from './scenes/Intro';
import { JournalUi } from './scenes/JournalUi';
import { KeyLegendUi } from './scenes/KeyLegendUi';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Tutorial } from './scenes/Tutorial';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1028,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Intro,
    Tutorial,
    MainGame,
    JournalUi,
    KeyLegendUi,
    InteractionUi,
    GameOver,
  ],
};

export default new Game(config);
