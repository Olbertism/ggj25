import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, 'background');

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');

    this.load.image('menuBg', 'menu-bg.png');
    this.load.image('logo', 'bubble.png');
    //this.load.image('bubble', 'bubble.png');
    this.load.image('camera', 'camera.png');
    this.load.image('lab-rat', 'rat.png');
    this.load.image('lamp', 'lamp.png');
    this.load.image('computer', 'pc.png');

    //audio:
    this.load.audio('bg_music', '/music/bg_music.mp3');
    this.load.audio('bubble_rumble', '/music/bubble_rumble.mp3');
    this.load.audio('rat-squeak', '/music/rat-squeak.mp3');
    this.load.audio('murmur', '/music/murmur.mp3');
    this.load.audio('lamp_on', '/music/lamp_turn_on.mp3');
    this.load.audio('camera_click', '/music/camera_click.mp3');
    this.load.audio('keyboard', '/music/keyboard.mp3');
    this.load.audio('gasp', '/music/gasp.mp3');
    this.load.audio('meow', '/music/meow.mp3');
    //this.load.image('guard', 'new_police_idle_sprite.png');
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu');
  }
}
